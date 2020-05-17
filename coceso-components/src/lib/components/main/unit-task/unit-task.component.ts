import {Component, Input} from '@angular/core';

import {IncidentDto, IncidentTypeDto, TaskDto, TaskStateDto} from 'mls-coceso-api';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {IncidentHelper} from '../../../helpers/incident.helper';
import {ClockService} from '../../../services/clock.service';
import {IncidentDataService} from '../../../services/incident.data.service';

@Component({
  selector: 'coceso-main-unit-task',
  templateUrl: './unit-task.component.html'
})
export class UnitTaskComponent {

  private readonly _task: Subject<TaskDto> = new BehaviorSubject(null);
  readonly options: Observable<TaskDisplayOptions>;
  readonly elapsed: Observable<number>;

  @Input() set task(value: TaskDto) {
    this._task.next(value);
  }

  constructor(private readonly incidentService: IncidentDataService, private readonly incidentHelper: IncidentHelper,
              private readonly clockService: ClockService) {
    this.options = this._task.pipe(switchMap(t => this.loadOptions(t)));
    this.elapsed = this._task.pipe(switchMap(t => clockService.elapsedMinutes(t.updated)));
  }

  private loadOptions(task: TaskDto): Observable<TaskDisplayOptions> {
    return task ? this.incidentService.getById(task.incident).pipe(map(i => this.buildOptions(task, i))) : of(null);
  }

  private buildOptions(task: TaskDto, incident: IncidentDto): TaskDisplayOptions {
    if (!task || !incident) {
      return null;
    }

    return {
      css: this.cssForType(task, incident),
      icon: this.iconForType(task, incident),
      type: this.charForType(task, incident),
      state: this.stateForType(task, incident),
    };
  }

  private cssForType(task: TaskDto, incident: IncidentDto): string {
    if (!incident.type) {
      return '';
    }

    let type;
    if (this.incidentHelper.isTaskOrTransport(incident)) {
      type = incident.blue ? 'TaskBlue' : 'Task';
    } else if (this.incidentHelper.isRelocation(task, incident)) {
      type = 'Relocation';
    } else if (this.incidentHelper.isHoldPosition(task, incident)) {
      type = 'HoldPosition';
    } else {
      type = incident.type;
    }

    return `unit-task-${type}`;
  }

  private iconForType(task: TaskDto, incident: IncidentDto): string {
    if (this.incidentHelper.isHoldPosition(task, incident)) {
      return 'adjust';
    }
    if (incident.type === IncidentTypeDto.Standby) {
      return 'pause';
    }

    return null;
  }

  private charForType(task: TaskDto, incident: IncidentDto): string {
    if (incident.type === IncidentTypeDto.Standby) {
      // Only display icon for standby
      return null;
    }

    if (this.incidentHelper.isHoldPosition(task, incident)) {
      // Only display icon if at position already
      return null;
    }
    if (this.incidentHelper.isRelocation(task, incident)) {
      // Display character if on way to position
      return 'Relocation';
    }

    // Just display the standard character for everything else
    return this.incidentHelper.shortType(incident);
  }

  private stateForType(task: TaskDto, incident: IncidentDto): string {
    if (this.incidentHelper.isHoldPosition(task, incident)) {
      // Do not display the state if at position already
      return null;
    }
    if (incident.type === IncidentTypeDto.Standby && task.state === TaskStateDto.AAO) {
      // Do not display the state if at standby
      return null;
    }

    return task.state;
  }
}

interface TaskDisplayOptions {
  css: string;
  icon: string;
  type: string;
  state: string;
}
