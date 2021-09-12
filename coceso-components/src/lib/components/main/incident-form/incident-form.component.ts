import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Component, OnDestroy} from '@angular/core';
import {FormArray, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {AlarmTypeDto, IncidentClosedReasonDto, IncidentDto, IncidentTypeDto, TaskStateDto} from 'mls-coceso-api';
import {NotificationService, TrackingFormBuilder, TrackingFormGroup} from 'mls-common-forms';
import {DialogContent, WindowService} from 'mls-common-ui';

import {BehaviorSubject, forkJoin, Observable, of, ReplaySubject, Subscription, throwError} from 'rxjs';
import {flatMap, switchMap, tap} from 'rxjs/operators';

import {IncidentHelper, TaskFormControl, TaskHelper} from '../../../helpers';
import {IncidentWithUnits, TaskWithUnit} from '../../../models';
import {IncidentDataService, TaskDataService} from '../../../services';
import {IncidentMessageFormComponent} from '../incident-message-form/incident-message-form.component';

@Component({
  templateUrl: './incident-form.component.html'
})
export class IncidentFormComponent implements DialogContent<IncidentDto>, OnDestroy {

  readonly windowTitle = new ReplaySubject<string>(1);
  readonly taskTitle = new ReplaySubject<string>(1);

  private readonly id = new BehaviorSubject<number | undefined>(undefined);
  private readonly incidentSubscription: Subscription;
  type?: IncidentTypeDto;
  states?: TaskStateDto[];

  readonly form: TrackingFormGroup;
  units: TaskFormControl<TaskWithUnit>[];

  hasUnits = true;
  hasCasus = true;

  constructor(private readonly incidentService: IncidentDataService, private readonly taskService: TaskDataService,
              private readonly incidentHelper: IncidentHelper, private readonly taskHelper: TaskHelper,
              private readonly windowService: WindowService, private readonly notificationService: NotificationService,
              private readonly translateService: TranslateService, fb: TrackingFormBuilder) {
    this.units = [];
    this.form = fb.group({
      type: [null, Validators.required],
      closed: [IncidentClosedReasonDto.Active],
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
        .pipe(switchMap(id => taskService.getIncident(id)))
        .subscribe(incident => this.setIncident(incident));
  }

  ngOnDestroy() {
    this.incidentSubscription.unsubscribe();
  }

  set data(data: IncidentDto) {
    this.type = data?.type;
    this.states = this.taskHelper.statesForType(this.type);

    const id = data?.id;
    this.id.next(id);

    if (!id) {
      this.setUnits([], true);
      this.form.setServerValue({
        type: null,
        closed: IncidentClosedReasonDto.Active,
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
        this.setUnits(data.units, false);
      }
    }
  }

  private setIncident(incident?: IncidentWithUnits) {
    this.updateTitles(incident);

    if (!incident) {
      this.hasUnits = false;
      this.hasCasus = false;
      return;
    }

    this.type = incident.type as IncidentTypeDto;
    this.states = this.taskHelper.statesForType(this.type);

    const options = [];
    if (incident.blue) {
      options.push('blue');
    }
    if (incident.priority) {
      options.push('priority');
    }

    this.setUnits(incident.units, true);
    this.form.setServerValue({
      type: incident.type,
      closed: incident.closed || IncidentClosedReasonDto.Active,
      bo: incident.bo ? incident.bo.info : '',
      ao: incident.ao ? incident.ao.info : '',
      info: incident.info,
      caller: incident.caller,
      casusNr: incident.casusNr,
      section: incident.section,
      options
    });

    this.hasUnits = incident.units && incident.units.length > 0;
    this.hasCasus = this.incidentHelper.hasCasusNr(incident);
  }

  private setUnits(units: TaskWithUnit[], withServerValue: boolean) {
    this.units = this.taskHelper.getTaskControls(units, this.units, withServerValue);
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
    if (unit.type === 'unit' && unit.id && incidentId && !this.units.find(c => c.task.unit === unit.id)) {
      const control = new TaskFormControl({
        unit: unit.id,
        incident: incidentId,
        state: TaskStateDto.Assigned,
        updated: Date.now() / 1000,
        alarmSent: null,
        casusSent: null
      }, false);
      this.units.push(control);
      (this.form.controls.units as FormArray).push(control);
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

  get sendAlarmDisabled(): boolean {
    return this.form.dirty || !this.hasUnits;
  }

  openSendAlarmForm() {
    if (this.id.value) {
      this.windowService.open(IncidentMessageFormComponent, {incident: this.id.value, type: AlarmTypeDto.Alarm});
    }
  }

  get sendCasusDisabled(): boolean {
    return this.form.dirty || !this.hasUnits || !this.hasCasus;
  }

  openSendCasusForm() {
    if (this.id.value) {
      this.windowService.open(IncidentMessageFormComponent, {incident: this.id.value, type: AlarmTypeDto.Casus});
    }
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
        .map(c => this.taskService.setState(incidentId, c.task.unit, c.value));
    return requests.length ? forkJoin(requests) : of(null);
  }
}
