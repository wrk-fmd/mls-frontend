import {Component, Input, OnInit, Output} from '@angular/core';
import {IncidentDto, TaskDto, UnitDto} from 'mls-coceso-api';
import {DialogWindowContent} from 'mls-common';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {UnitDataService} from '../../../services/unit.data.service';

@Component({
  selector: 'mls-coceso-incident-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements DialogWindowContent, OnInit {

  units: Observable<UnitDto[]>;

  @Input() data: any;

  @Output() windowTitle: Subject<string> = new BehaviorSubject('Units');
  @Output() taskTitle: Subject<string> = new BehaviorSubject('Units');

  constructor(private readonly unitService: UnitDataService) {
    this.units = this.unitService.getAll();
  }

  ngOnInit() {
  }

  title(incident: IncidentDto): string {
    return incident.bo && incident.info;
  }

  showBo(incident: IncidentDto): boolean {
    return !!incident.bo;
  }

  showAo(incident: IncidentDto): boolean {
    return !!incident.ao;
  }

  unitCall(task: TaskDto): string {
    return task.unit + '';
  }

  nextState(task: TaskDto): void {
    // TODO
  }

  openForm(incident: IncidentDto): void {
    // TODO
  }

  addLog(incident: IncidentDto): void {
    // TODO
  }

  openDashboard(incident: IncidentDto): void {
    // TODO
  }

  // incidentTitle(incident: IncidentDto) {
  //   return incident.bo;
  // }
}
