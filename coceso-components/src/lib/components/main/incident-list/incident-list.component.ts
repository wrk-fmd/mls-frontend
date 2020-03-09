import {Component, Input, Output} from '@angular/core';
import {IncidentDto} from 'mls-coceso-api';
import {DialogWindowContent} from 'mls-common';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {IncidentDataService} from '../../../services/incident.data.service';

@Component({
  selector: 'mls-coceso-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss']
})
export class IncidentListComponent implements DialogWindowContent {

  incidents: Observable<IncidentDto[]>;

  @Input() data: any;

  @Output() windowTitle: Subject<string> = new BehaviorSubject('Incidents');
  @Output() taskTitle: Subject<string> = new BehaviorSubject('Incidents');

  constructor(private readonly incidentService: IncidentDataService) {
    this.incidents = this.incidentService.getAll();
  }
}
