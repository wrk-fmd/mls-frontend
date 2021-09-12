import {Component, Input} from '@angular/core';

import {IncidentTypeDto, TaskStateDto} from 'mls-coceso-api';

import {Observable, of, ReplaySubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {IncidentHelper, TaskHelper} from '../../../helpers';
import {TaskWithIncident} from '../../../models';
import {ClockService} from '../../../services';

@Component({
  selector: 'coceso-main-unit-task',
  templateUrl: './unit-task.component.html'
})
export class UnitTaskComponent {

  _task?: TaskWithIncident;

  css: string = '';
  icon: string | null = null;
  type: string | null = null;
  state: string | null = null;

  private readonly updated = new ReplaySubject<number | null>(1);
  readonly elapsed: Observable<number>;

  @Input() set task(value: TaskWithIncident) {
    this._task = value;
    this.setTask(value);
  }

  constructor(private readonly incidentHelper: IncidentHelper, private readonly taskHelper: TaskHelper,
              private readonly clockService: ClockService) {
    this.elapsed = this.updated.pipe(switchMap(timestamp => timestamp ? clockService.elapsedMinutes(timestamp) : of(0)));
  }

  nextState(event: Event): void {
    event.stopPropagation();
    if (this._task) {
      this.taskHelper.nextState(this._task);
    }
  }

  private setTask(task: TaskWithIncident) {
    if (!task || !task.incidentData) {
      this.css = '';
      this.icon = null;
      this.type = null;
      this.state = null;
      this.updated.next(null);
    } else {
      this.css = this.cssForType(task);
      this.icon = this.iconForType(task);
      this.type = this.charForType(task);
      this.state = this.stateForType(task);
      this.updated.next(task.updated);
    }
  }

  private cssForType(task: TaskWithIncident): string {
    const incident = task.incidentData;
    if (!incident || !incident.type) {
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

  private iconForType(task: TaskWithIncident): string | null {
    const incident = task.incidentData;
    if (this.incidentHelper.isHoldPosition(task, incident)) {
      return 'adjust';
    }
    if (incident && incident.type === IncidentTypeDto.Standby) {
      return 'pause';
    }

    return null;
  }

  private charForType(task: TaskWithIncident): string | null {
    const incident = task.incidentData;

    if (incident && incident.type === IncidentTypeDto.Standby) {
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

  private stateForType(task: TaskWithIncident): string | null {
    const incident = task.incidentData;

    if (this.incidentHelper.isHoldPosition(task, incident)) {
      // Do not display the state if at position already
      return null;
    }
    if (incident && incident.type === IncidentTypeDto.Standby && task.state === TaskStateDto.Abo) {
      // Do not display the state if at standby
      return null;
    }

    return task.state;
  }
}
