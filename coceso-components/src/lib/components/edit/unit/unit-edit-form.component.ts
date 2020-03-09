import {Component, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {IncidentDto, IncidentStateDto, IncidentTypeDto} from 'mls-coceso-api';
import {DialogActionButton, DialogWindowContent, TrackingFormBuilder, TrackingFormControl} from 'mls-common';

import {BehaviorSubject, Subject, Subscription} from 'rxjs';

import {IncidentHelper} from '../../../helpers/incident.helper';
import {IncidentDataService} from '../../../services/incident.data.service';

@Component({
  selector: 'mls-unit-edit',
  templateUrl: './unit-edit-form.component.html',
  styleUrls: ['./unit-edit-form.component.scss']
})
export class UnitEditFormComponent implements OnInit {

  @Input() data: IncidentDto;

  @Output() windowTitle: Subject<string> = new BehaviorSubject('Create incident');
  @Output() taskTitle: Subject<string> = new BehaviorSubject('Create incident');

  private readonly saveButton: DialogActionButton = {label: 'ok', action: () => this.save(), disabled: true};
  @Output() actions = [
    this.saveButton
  ];

  private subscription: Subscription;
  private id: number;
  private incident: IncidentDto;

  form: FormGroup;

  constructor(private readonly incidentService: IncidentDataService, private readonly incidentHelper: IncidentHelper,
              private readonly translateService: TranslateService, fb: TrackingFormBuilder) {
    this.form = fb.group({
      type: [null],
      options: [[]],
      state: [IncidentStateDto.Open],
      bo: [''],
      ao: [''],
      info: [''],
      caller: [''],
      casusNr: [''],
      section: ['']
    });

    this.form.statusChanges.subscribe(() => this.onFormUpdated());
  }

  ngOnInit(): void {
    if (this.data) {
      this.incident = this.data;
      if (this.data.id) {
        this.loadData(this.data.id);
      } else {
        Object.keys(this.data).forEach(name => this.setValue(name, this.data[name], false, false));
        this.onFormUpdated();
        this.updateTitles();
      }
    } else {
      this.incident = {};
    }
  }

  private loadData(id: number) {
    this.id = id;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.incidentService.getById(id).subscribe(incident => this.setData(incident));
  }

  private setData(incident: IncidentDto) {
    this.incident = incident;
    this.updateTitles();

    if (!incident) {
      return;
    }

    const options = [];
    if (incident.blue) {
      options.push('blue');
    }
    if (incident.priority) {
      options.push('priority');
    }

    this.setValue('type', incident.type);
    this.setValue('options', options);
    this.setValue('state', incident.state);
    this.setValue('bo', incident.bo ? incident.bo.info : '');
    this.setValue('ao', incident.ao ? incident.ao.info : '');
    this.setValue('info', incident.info, true);
    this.setValue('caller', incident.caller);
    this.setValue('casusNr', incident.casusNr);
    this.setValue('section', incident.section);

    this.onFormUpdated();
  }

  private setValue(name: string, value: any, keepExisting?: boolean, setServerValue: boolean = true) {
    if (value === undefined) {
      return;
    }

    const control = this.form.controls[name];
    if (setServerValue && control instanceof TrackingFormControl) {
      control.setServerValue(value, keepExisting);
    } else if (control) {
      control.setValue(value);
    }
  }

  private onFormUpdated() {
    this.saveButton.disabled = this.form.invalid || this.form.pristine;
  }

  private updateTitles() {
    if (this.id) {
      const prefix = this.translateService.instant(this.form.value.type === IncidentTypeDto.Relocation
          ? 'incident.form.editRelocation'
          : 'incident.form.editIncident'
      );

      const shortTitle = this.incidentHelper.shortTitle(this.incident);
      const fullTitle = this.incidentHelper.fullTitle(this.incident);

      this.windowTitle.next(shortTitle ? `${prefix}: ${shortTitle}` : prefix);
      this.taskTitle.next(fullTitle ? fullTitle : prefix);
    } else {
      const title = this.translateService.instant(this.incident.type === IncidentTypeDto.Relocation
          ? 'incident.form.addRelocation'
          : 'incident.form.addIncident'
      );
      this.windowTitle.next(title);
      this.taskTitle.next(title);
    }
  }

  get types(): IncidentTypeDto[] {
    if (this.incidentHelper.isTaskOrTransport(this.incident)) {
      return [IncidentTypeDto.Task, IncidentTypeDto.Transport];
    }
    if (this.incident.type === IncidentTypeDto.Relocation) {
      return [IncidentTypeDto.Relocation];
    }
    return [IncidentTypeDto.Task, IncidentTypeDto.Transport, IncidentTypeDto.Relocation];
  }

  save() {
    const data = {
      type: this.form.value.type,
      blue: this.form.value.options.includes('blue'),
      priority: this.form.value.options.includes('priority'),
      state: this.form.value.state,
      bo: {info: this.form.value.bo},
      ao: {info: this.form.value.ao},
      info: this.form.value.info,
      caller: this.form.value.caller,
      casusNr: this.form.value.casusNr,
      section: this.form.value.section
    };

    if (this.id) {
      this.incidentService.updateIncident(this.id, data).subscribe(() => console.log('done'));
    } else {
      this.incidentService.createIncident(data).subscribe(id => this.loadData(id));
    }
  }
}
