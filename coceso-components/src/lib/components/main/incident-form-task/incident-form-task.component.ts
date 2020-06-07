import {formatDate} from '@angular/common';
import {Component, Inject, Input, LOCALE_ID} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {TranslateService} from '@ngx-translate/core';

import {AlarmTypeDto, TaskStateDto, UnitDto} from 'mls-coceso-api';
import {WindowService} from 'mls-common-ui';

import {TaskFormControl} from '../../../helpers';
import {TaskWithUnit} from '../../../models/incident-with-units';
import {IncidentMessageFormComponent} from '../incident-message-form/incident-message-form.component';

@Component({
  selector: 'coceso-main-incident-form-task',
  templateUrl: './incident-form-task.component.html',
  styleUrls: ['./incident-form-task.component.scss']
})
export class IncidentFormTaskComponent {

  private _control: TaskFormControl<TaskWithUnit>;

  @Input() set control(value: TaskFormControl<TaskWithUnit>) {
    this._control = value;
  }

  get control(): TaskFormControl<TaskWithUnit> {
    return this._control;
  }

  @Input()
  states: TaskStateDto[];

  @Input()
  showDuplicate: boolean;

  @Input()
  sendAlarmDisabled: boolean;

  @Input()
  showSendCasus: boolean;

  @Input()
  sendCasusDisabled: boolean;

  private readonly translations;

  constructor(private readonly windowService: WindowService, translateService: TranslateService,
              @Inject(LOCALE_ID) private readonly locale: string) {
    // Load the translations only once instead of at every change
    this.translations = translateService.instant([
      'incident.message.title.ALARM', 'incident.message.sent.ALARM',
      'incident.message.title.CASUS', 'incident.message.sent.CASUS'
    ]);
  }

  get task(): TaskWithUnit {
    return this.control ? this.control.task : {};
  }

  get unit(): UnitDto {
    return this.task.unitData || {};
  }

  get sendAlarmColor(): ThemePalette {
    return this.task.alarmSent ? null : 'accent';
  }

  get sendAlarmTooltip(): string {
    return this.getTooltip(this.task.alarmSent, AlarmTypeDto.ALARM);
  }

  get sendCasusColor(): ThemePalette {
    return this.task.casusSent ? null : 'accent';
  }

  get sendCasusTooltip(): string {
    return this.getTooltip(this.task.casusSent, AlarmTypeDto.CASUS);
  }

  private getTooltip(timestamp: number, type: AlarmTypeDto) {
    return timestamp
        ? this.translations[`incident.message.sent.${type}`] + ': ' + formatDate(timestamp * 1000, 'mediumTime', this.locale)
        : this.translations[`incident.message.title.${type}`];
  }

  openSendAlarmForm() {
    if (this.task.incident && this.task.unit) {
      this.windowService.open(IncidentMessageFormComponent, {
        incident: this.task.incident,
        units: [this.task.unit],
        type: AlarmTypeDto.ALARM
      });
    }
  }

  openSendCasusForm() {
    if (this.task.incident && this.task.unit) {
      this.windowService.open(IncidentMessageFormComponent, {
        incident: this.task.incident,
        units: [this.task.unit],
        type: AlarmTypeDto.CASUS
      });
    }
  }
}
