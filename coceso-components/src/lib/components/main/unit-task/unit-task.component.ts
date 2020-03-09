import {Component, Input} from '@angular/core';
import {IncidentDto, IncidentTypeDto, TaskDto, TaskStateDto, UnitEndpointService} from 'mls-coceso-api';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';

import {IncidentDataService} from '../../../services/incident.data.service';

@Component({
  selector: 'coceso-main-unit-task',
  templateUrl: './unit-task.component.html',
  styleUrls: ['./unit-task.component.scss'],
  host: {'[className]': 'css'}
})
export class UnitTaskComponent {

  private readonly _task: Subject<TaskDto> = new BehaviorSubject(null);
  readonly incident: Observable<IncidentDto>;
  readonly css: Observable<string>;
  readonly icon: Observable<string>;
  readonly type: Observable<string>;
  readonly state: Observable<string>;

  @Input() set task(value: TaskDto) {
    this._task.next(value);
  }

  constructor(private readonly unitService: UnitEndpointService, private readonly incidentService: IncidentDataService) {
    this.incident = this._task.pipe(flatMap(t => t ? incidentService.getById(t.incident) : null));
    this.css = this.incident.pipe(map(i => this.cssForType(i)));
    this.icon = this.incident.pipe(map(i => this.iconForType(i)));
    this.type = this.incident.pipe(map(i => this.charForType(i)));
    this.state = combineLatest([this._task, this.incident]).pipe(map(([t, i]) => this.stateForType(t, i)));
  }

  private cssForType(incident: IncidentDto): string {
    if (!incident || !incident.type) {
      return '';
    }

    let type;
    if (incident.type === IncidentTypeDto.Task) {
      type = incident.blue ? 'TaskBlue' : 'Task';
    } else {
      type = incident.type;
    }

    return `unit-task-${type}`;
  }

  private iconForType(incident: IncidentDto): string {
    if (!incident) {
      return null;
    }

    switch (incident.type) {
      case IncidentTypeDto.HoldPosition:
        return 'adjust';
      case IncidentTypeDto.Standby:
        return 'pause';
    }

    return null;
  }

  private charForType(incident: IncidentDto): string {
    if (!incident) {
      return null;
    }

    switch (incident.type) {
      case IncidentTypeDto.Task:
        return incident.blue ? 'TaskBlue' : 'Task';
      case IncidentTypeDto.Transport:
      case IncidentTypeDto.Relocation:
      case IncidentTypeDto.ToHome:
        return incident.type;
    }

    return null;
  }

  private stateForType(task: TaskDto, incident: IncidentDto): string {
    if (!task) {
      return null;
    }
    if (!incident) {
      return task.state;
    }

    switch (incident.type) {
      case IncidentTypeDto.HoldPosition:
      case IncidentTypeDto.Standby:
        return task.state === TaskStateDto.Assigned ? task.state : null;
    }

    return task.state;
  }
}
