import {Component, Output} from '@angular/core';
import {IncidentDto} from 'mls-coceso-api';
import {DialogContent} from 'mls-common';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {IncidentDataService} from '../../../services/incident.data.service';

@Component({
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss']
})
export class IncidentListComponent implements DialogContent {

  readonly incidents: Observable<IncidentDto[]>;

  @Output() windowTitle: Subject<string> = new BehaviorSubject('Incidents');
  @Output() taskTitle: Subject<string> = new BehaviorSubject('Incidents');

  readonly activePanels = new Set<number>();

  constructor(private readonly incidentService: IncidentDataService) {
    this.incidents = this.incidentService.getAll();
  }

  set data(_) {
  }
}
