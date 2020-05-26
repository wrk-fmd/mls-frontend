import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Component, OnDestroy} from '@angular/core';
import {FormArray, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {IncidentClosedReasonDto, IncidentDto, IncidentTypeDto, TaskDto, TaskStateDto} from 'mls-coceso-api';
import {NotificationService, TrackingFormBuilder, TrackingFormGroup} from 'mls-common-forms';
import {DialogContent} from 'mls-common-ui';

import {BehaviorSubject, forkJoin, Observable, of, ReplaySubject, Subscription, throwError} from 'rxjs';
import {flatMap, switchMap, tap} from 'rxjs/operators';

import {IncidentHelper, TaskFormControl, TaskHelper} from '../../../helpers';
import {IncidentDataService, TaskService} from '../../../services';

@Component({
  templateUrl: './incident-form.component.html'
})
export class IncidentFormComponent implements DialogContent<IncidentDto>, OnDestroy {

  readonly windowTitle = new ReplaySubject<string>(1);
  readonly taskTitle = new ReplaySubject<string>(1);

  private readonly id = new BehaviorSubject<number>(null);
  private readonly incidentSubscription: Subscription;
  type: IncidentTypeDto;

  readonly form: TrackingFormGroup;
  units: TaskFormControl[];

  constructor(private readonly incidentService: IncidentDataService, private readonly taskService: TaskService,
              private readonly incidentHelper: IncidentHelper, private readonly taskHelper: TaskHelper,
              private readonly notificationService: NotificationService, private readonly translateService: TranslateService,
              fb: TrackingFormBuilder) {
    this.units = [];
    this.form = fb.group({
      type: [null, Validators.required],
      closed: [IncidentClosedReasonDto.Open],
      bo: [''],
      ao: [''],
      info: ['', null, null, true],
      caller: ['', Validators.maxLength(100)],
      casusNr: ['', Validators.maxLength(100)],
      section: [null],
      units: fb.array([]),
      options: [[]]
    });

    this.incidentSubscription = this.id
        .pipe(switchMap(id => incidentService.getById(id)))
        .subscribe(incident => this.setIncident(incident));
  }

  ngOnDestroy() {
    this.incidentSubscription.unsubscribe();
  }

  set data(data) {
    this.type = data ? data.type : null;

    const id = data ? data.id : null;
    this.id.next(id);

    if (!id) {
      this.setUnits([]);
      this.form.setServerValue({
        type: null,
        closed: IncidentClosedReasonDto.Open,
        bo: '',
        ao: '',
        info: '',
        caller: '',
        casusNr: '',
        section: null,
        options: []
      });
    }

    if (data) {
      // Set passed values if given
      this.form.patchValue(data);
      this.form.markAsUntouched();
      if (data.units) {
        this.setUnits(data.units);
      }
    }
  }

  private setIncident(incident: IncidentDto) {
    this.updateTitles(incident);

    if (!incident) {
      return;
    }

    this.type = incident.type as IncidentTypeDto;

    const options = [];
    if (incident.blue) {
      options.push('blue');
    }
    if (incident.priority) {
      options.push('priority');
    }

    this.setUnits(incident.units);
    this.form.setServerValue({
      type: incident.type,
      closed: incident.closed || IncidentClosedReasonDto.Open,
      bo: incident.bo ? incident.bo.info : '',
      ao: incident.ao ? incident.ao.info : '',
      info: incident.info,
      caller: incident.caller,
      casusNr: incident.casusNr,
      section: incident.section,
      options
    });
  }

  private setUnits(units: TaskDto[]) {
    this.units = this.taskHelper.getTaskControls(units, this.units);
    const formArray = this.form.controls.units as FormArray;
    formArray.clear();
    this.units.forEach(c => formArray.push(c));
  }

  private updateTitles(incident?: IncidentDto) {
    if (this.id.value) {
      const prefix = this.translateService.instant(this.form.value.type === IncidentTypeDto.Position
          ? 'incident.form.editPosition'
          : 'incident.form.editIncident'
      );

      const bo = this.incidentHelper.shortBo(incident);
      const fullTitle = this.incidentHelper.title(incident);

      this.windowTitle.next(bo ? `${prefix}: ${bo}` : prefix);
      this.taskTitle.next(fullTitle ? fullTitle : prefix);
    } else {
      const title = this.translateService.instant(this.form.value.type === IncidentTypeDto.Position
          ? 'incident.form.addPosition'
          : 'incident.form.addIncident'
      );
      this.windowTitle.next(title);
      this.taskTitle.next(title);
    }
  }

  dropUnit(event: CdkDragDrop<any>) {
    const unit = event.item.data;
    const incidentId = this.id.value;
    if (unit.type === 'unit' && unit.id && incidentId && !this.units.find(c => c.unit === unit.id)) {
      const control = new TaskFormControl({unit: unit.id, incident: incidentId});
      this.units.push(control);
      (this.form.controls.units as FormArray).push(control);

      control.setValue(TaskStateDto.Assigned);
      control.isNew = true;
    }
  }

  get isTaskOrTransport(): boolean {
    return this.incidentHelper.isTaskOrTransport({type: this.type});
  }

  get isPosition(): boolean {
    return this.type === IncidentTypeDto.Position;
  }

  get types(): IncidentTypeDto[] {
    if (this.isTaskOrTransport) {
      return [IncidentTypeDto.Task, IncidentTypeDto.Transport];
    }
    if (this.isPosition) {
      return [IncidentTypeDto.Position];
    }
    return [IncidentTypeDto.Task, IncidentTypeDto.Transport, IncidentTypeDto.Position];
  }

  get saveDisabled(): boolean {
    return this.form.invalid || this.form.pristine;
  }

  save() {
    const options = this.form.value.options || [];

    const data = {
      type: this.form.value.type,
      blue: options.includes('blue'),
      priority: options.includes('priority'),
      closed: this.form.value.closed,
      bo: {info: this.form.value.bo},
      ao: {info: this.form.value.ao},
      info: this.form.value.info,
      caller: this.form.value.caller,
      casusNr: this.form.value.casusNr,
      section: this.form.value.section || ''
    };

    const incidentId = this.id.value;
    if (incidentId) {
      this.incidentService.updateIncident(incidentId, data)
          .pipe(flatMap(() => this.saveUnits()))
          .subscribe(this.notificationService.onError('incident.update.error'));
    } else {
      this.incidentService.createIncident(data)
          .pipe(tap(id => this.id.next(id)), flatMap(() => this.saveUnits()))
          .subscribe(this.notificationService.onError('incident.create.error'));
    }
  }

  private saveUnits(): Observable<any> {
    const incidentId = this.id.value;
    if (!incidentId) {
      return throwError('No incident id for saving units');
    }

    const requests = this.units
        .filter(c => c.dirty)
        .map(c => this.taskService.setState(incidentId, c.unit, c.value));
    return requests.length ? forkJoin(requests) : of(null);
  }
}
