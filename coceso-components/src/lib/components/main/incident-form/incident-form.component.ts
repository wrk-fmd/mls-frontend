import {Component, OnDestroy} from '@angular/core';
import {Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {IncidentClosedReasonDto, IncidentDto, IncidentTypeDto} from 'mls-coceso-api';
import {DialogContent, NotificationService, TrackingFormBuilder, TrackingFormGroup} from 'mls-common';

import {BehaviorSubject, ReplaySubject, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {IncidentHelper} from '../../../helpers/incident.helper';
import {IncidentDataService} from '../../../services/incident.data.service';

@Component({
  templateUrl: './incident-form.component.html'
})
export class IncidentFormComponent implements DialogContent<IncidentDto>, OnDestroy {

  readonly windowTitle = new ReplaySubject<string>(1);
  readonly taskTitle = new ReplaySubject<string>(1);

  private readonly id = new BehaviorSubject<number>(null);
  private readonly incidentSubscription: Subscription;
  private type: IncidentTypeDto;

  form: TrackingFormGroup;

  constructor(private readonly incidentService: IncidentDataService, private readonly incidentHelper: IncidentHelper,
              private readonly notificationService: NotificationService, private readonly translateService: TranslateService,
              fb: TrackingFormBuilder) {
    this.form = fb.group({
      type: [null, Validators.required],
      closed: [IncidentClosedReasonDto.Open],
      bo: [''],
      ao: [''],
      info: ['', null, null, true],
      caller: ['', Validators.maxLength(100)],
      casusNr: ['', Validators.maxLength(100)],
      section: [null],
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

  private updateTitles(incident?: IncidentDto) {
    if (this.id.value) {
      const prefix = this.translateService.instant(this.form.value.type === IncidentTypeDto.Position
          ? 'incident.form.editPosition'
          : 'incident.form.editIncident'
      );

      const shortTitle = this.incidentHelper.shortTitle(incident);
      const fullTitle = this.incidentHelper.fullTitle(incident);

      this.windowTitle.next(shortTitle ? `${prefix}: ${shortTitle}` : prefix);
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

  get types(): IncidentTypeDto[] {
    if (this.incidentHelper.isTaskOrTransport({type: this.type})) {
      return [IncidentTypeDto.Task, IncidentTypeDto.Transport];
    }
    if (this.type === IncidentTypeDto.Position) {
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
          .subscribe(this.notificationService.onError('incident.update.error'));
    } else {
      this.incidentService.createIncident(data)
          .pipe(tap(id => this.id.next(id)))
          .subscribe(this.notificationService.onError('incident.create.error'));
    }
  }
}
