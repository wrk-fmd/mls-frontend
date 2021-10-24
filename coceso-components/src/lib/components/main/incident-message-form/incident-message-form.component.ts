import {Component, OnDestroy} from '@angular/core';
import {Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

import {AlarmRecipientsDto, AlarmTypeDto, IncidentDto, PointDto, SendAlarmDto, TaskDto} from 'mls-coceso-api';
import {NotificationService, TrackingFormBuilder, TrackingFormControl, TrackingFormGroup} from 'mls-common-forms';
import {DialogContent} from 'mls-common-ui';

import {BehaviorSubject, ReplaySubject, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {IncidentHelper, PointHelper} from '../../../helpers';
import {IncidentWithUnits, TaskWithUnit} from '../../../models';
import {IncidentDataService, TaskDataService} from '../../../services';

@Component({
  templateUrl: './incident-message-form.component.html',
  styleUrls: ['./incident-message-form.component.scss']
})
export class IncidentMessageFormComponent implements DialogContent<IncidentMessageFormOptions>, OnDestroy {

  readonly windowTitle = new ReplaySubject<string>(1);
  readonly taskTitle = new ReplaySubject<string>(1);
  title: string = '';

  private readonly id = new BehaviorSubject<number | undefined>(undefined);

  incident?: IncidentWithUnits;
  units: TaskWithUnit[] = [];
  type?: AlarmTypeDto;

  private selectedUnits: number[] = [];
  private mode?: AlarmRecipientsDto;
  readonly modes = [AlarmRecipientsDto.Unsent, AlarmRecipientsDto.All];

  readonly form: TrackingFormGroup;

  private readonly incidentSubscription: Subscription;
  private readonly modeSubscription: Subscription;

  constructor(private readonly incidentService: IncidentDataService, taskService: TaskDataService,
              private readonly incidentHelper: IncidentHelper, private readonly pointHelper: PointHelper,
              private readonly notificationService: NotificationService, private readonly translateService: TranslateService,
              private readonly dialog: MatDialogRef<any>, fb: TrackingFormBuilder) {
    this.form = fb.group({
      mode: [AlarmRecipientsDto.Unsent, Validators.required],
      text: ['', Validators.required, null, true]
    });
    this.modeSubscription = this.form.controls.mode.valueChanges.subscribe(mode => this.updateUnits(this.incident, mode));

    this.incidentSubscription = this.id
        .pipe(switchMap(id => taskService.getIncident(id)))
        .subscribe(incident => this.setIncident(incident));
  }

  ngOnDestroy() {
    this.modeSubscription.unsubscribe();
    this.incidentSubscription.unsubscribe();
  }

  set data(data: IncidentMessageFormOptions) {
    if (!data) {
      this.type = undefined;
      this.mode = AlarmRecipientsDto.Unsent;
      this.id.next(undefined);
      return;
    }

    this.type = data.type;
    if (data.units) {
      this.mode = AlarmRecipientsDto.List;
      this.selectedUnits = data.units;
    } else {
      this.mode = data.mode || AlarmRecipientsDto.Unsent;
    }

    this.id.next(data.incident);
  }

  private setIncident(incident?: IncidentWithUnits) {
    this.incident = incident;
    this.updateUnits(incident, this.mode);
    this.updateTitles(incident);
    (this.form.controls.text as TrackingFormControl).setServerValue(this.buildMessage(incident));
  }

  private updateUnits(incident?: IncidentWithUnits, mode?: AlarmRecipientsDto) {
    if (!incident) {
      this.units = [];
      return;
    }

    let tasks = incident.units;

    if (mode === AlarmRecipientsDto.Unsent) {
      tasks = tasks.filter(task => !this.getLastSent(task));
    } else if (mode === AlarmRecipientsDto.List) {
      tasks = tasks.filter(task => this.selectedUnits.includes(task.unit));
    }

    this.units = tasks;
  }

  private getLastSent(task: TaskDto) {
    switch (this.type) {
      case AlarmTypeDto.Alarm:
        return task.alarmSent;
      case AlarmTypeDto.Casus:
        return task.casusSent;
      default:
        return null;
    }
  }

  private updateTitles(incident?: IncidentDto) {
    this.title = this.translateService.instant(`incident.message.title.${this.type || 'default'}`);
    this.windowTitle.next(incident ? `${this.title} – ${this.incidentHelper.title(incident)}` : this.title);
    this.taskTitle.next(this.title);
  }

  private buildMessage(incident?: IncidentWithUnits): string {
    if (!incident) {
      return '';
    }

    const params = {
      incidentId: incident.id,
      type: this.translateService.instant(`incident.type.${this.incidentHelper.shortType(incident)}`),
      bo: this.pointHelper.toString(incident.bo, '\n', 'incident.boMissing'),
      ao: this.pointHelper.toString(incident.ao, '\n', 'incident.aoMissing'),
      boUrl: this.buildCoordinateUrl(incident.bo),
      aoUrl: this.buildCoordinateUrl(incident.ao),
      info: this.limitString(incident.info, 80),
      units: this.buildUnitsString(incident.units),
      casusNr: this.limitString(incident.casusNr, 40),
      erType: this.limitString('', 20) // TODO
    };

    return this.translateService.getParsedResult(this.incidentService.getAlarmTemplates(), this.type, params).trim();
  }

  private limitString(str: string, max: number) {
    if (!str) {
      return '';
    }
    str = str.trim();
    return str.length > max ? str.substring(0, max - 3) + '...' : str;
  }

  private buildUnitsString(tasks: TaskWithUnit[]): string {
    const units = tasks.map(t => t.unitData?.call)
        .filter(u => !!u)
        .sort()
        .join(', ');
    return this.limitString(units, 50);
  }

  private buildCoordinateUrl(point?: PointDto): string {
    if (!point || !point.coordinates) {
      // TODO i18n
      return 'no coordinates';
    }

    return `https://google.com/maps/place/${point.coordinates.lat},${point.coordinates.lng}`;
  }

  get showModeForm(): boolean {
    return this.mode !== AlarmRecipientsDto.List;
  }

  get saveDisabled(): boolean {
    return this.form.invalid || !this.units.length;
  }

  save() {
    if (!this.type) {
      return;
    }

    const data: SendAlarmDto = {
      type: this.type,
      recipients: this.form.value.mode,
      message: this.form.value.text || ''
    };

    if (this.mode === AlarmRecipientsDto.List) {
      data.recipients = AlarmRecipientsDto.List;
      data.units = this.selectedUnits;
    }

    const id = this.id.value;
    if (id) {
      this.incidentService.sendAlarm(id, data)
          .pipe(tap(_ => this.dialog.close()))
          .subscribe(this.notificationService.onError('incident.message.error'));
    }
  }
}

export interface IncidentMessageFormOptions {
  incident: number;
  type?: AlarmTypeDto;
  mode?: AlarmRecipientsDto;
  units?: number[];
}
