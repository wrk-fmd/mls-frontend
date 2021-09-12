import {Component, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {IncidentDto, IncidentTypeDto, TaskDto, TaskStateDto, UnitDto} from 'mls-coceso-api';
import {NotificationService} from 'mls-common-forms';
import {DialogContent} from 'mls-common-ui';

import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {IncidentHelper} from '../../../helpers/incident.helper';
import {IncidentDataService, TaskDataService, UnitDataService} from '../../../services';

@Component({
  selector: 'coceso-main-task-dialog',
  templateUrl: './task-dialog.component.html'
})
export class TaskDialogComponent implements DialogContent<TaskDto> {

  readonly windowTitle: Observable<string>;
  readonly incident: Observable<IncidentDto | undefined>;
  readonly units: Observable<UnitInfo[]>;
  readonly options: Observable<TaskDialogOptions | null>;

  private readonly _task = new BehaviorSubject<TaskDto | undefined>(undefined);

  @Input() set data(value: TaskDto) {
    this._task.next(value);
  }

  constructor(incidentService: IncidentDataService, private readonly unitService: UnitDataService,
              private readonly taskService: TaskDataService, private readonly incidentHelper: IncidentHelper,
              private readonly notificationService: NotificationService, private readonly dialog: MatDialogRef<any>) {
    const data = this._task.pipe(switchMap(task =>
        task ? combineLatest([incidentService.getById(task.incident), unitService.getById(task.unit)]) : of([])
    ), shareReplay(1));

    this.windowTitle = data.pipe(map(([incident, unit]) => this.buildTitle(incident, unit)));
    this.incident = data.pipe(map(([incident, _]) => incident));
    this.units = data.pipe(switchMap(([incident, unit]) => this.buildUnits(incident, unit)));
    this.options = data.pipe(map(([incident, unit]) => this.buildOptions(incident, unit)));
  }

  setState(state: TaskStateDto) {
    const task = this._task.value;
    if (!task) {
      return;
    }

    this.taskService.setState(task.incident, task.unit, state)
        .pipe(tap(() => this.dialog.close()))
        .subscribe(this.notificationService.onError('task.error'));
  }

  private buildTitle(incident?: IncidentDto, unit?: UnitDto): string {
    const title = this.incidentHelper.title(incident);
    const call = unit?.call;

    if (title && call) {
      return `${call} – ${title}`;
    }
    if (title) {
      return title;
    }
    if (call) {
      return call;
    }
    return '';
  }

  private buildUnits(incident?: IncidentDto, unit?: UnitDto): Observable<UnitInfo[]> {
    return incident && unit ? combineLatest(incident.units
        .filter(t => t.unit !== unit.id)
        .map(t => this.loadUnitInfo(t))
    ) : of([]);
  }

  private loadUnitInfo(task: TaskDto): Observable<UnitInfo> {
    return this.unitService.getById(task.unit).pipe(map(u => ({
      call: u?.call || '',
      state: task.state as TaskStateDto
    })));
  }

  private buildOptions(incident?: IncidentDto, unit?: UnitDto): TaskDialogOptions | null {
    if (!incident || !incident.units || !unit) {
      return null;
    }

    // Load the most recent task information from the incident
    const task = incident.units.find(t => t.unit === unit.id);
    if (!task) {
      return null;
    }

    const currentState = task.state as TaskStateDto;
    const nextState = this.calculateNextState(currentState, incident.type as IncidentTypeDto);
    if (!nextState) {
      return null;
    }

    let info = 'task.dialog.next';
    let button = 'form.yes';

    switch (incident.type) {
      case IncidentTypeDto.Standby:
        switch (nextState) {
          case TaskStateDto.Abo:
            info = 'task.dialog.standby.send';
            break;
          case TaskStateDto.Detached:
            info = 'task.dialog.standby.end';
            break;
        }
        break;
      case IncidentTypeDto.ToHome:
        button = nextState === TaskStateDto.Detached ? 'task.dialog.isHome' : `task.state.${nextState}`;
        break;
      case IncidentTypeDto.Position:
        switch (nextState) {
          case TaskStateDto.Abo:
            info = 'task.dialog.position.send';
            break;
          case TaskStateDto.Detached:
            info = 'task.dialog.position.end';
            break;
          default:
            button = `task.state.${nextState}`;
            break;
        }
        break;
      default:
        button = `task.state.${nextState}`;
        break;
    }

    return {currentState, nextState, info, button};
  }

  private calculateNextState(state: TaskStateDto, type: IncidentTypeDto): TaskStateDto | null {
    const isStandby = type === IncidentTypeDto.Standby;
    const isTaskOrTransport = type === IncidentTypeDto.Task || type === IncidentTypeDto.Transport;

    switch (state) {
      case TaskStateDto.Assigned:
        return isStandby ? TaskStateDto.Abo : TaskStateDto.Zbo;
      case TaskStateDto.Zbo:
        return TaskStateDto.Abo;
      case TaskStateDto.Abo:
        return isTaskOrTransport ? TaskStateDto.Zao : TaskStateDto.Detached;
      case TaskStateDto.Zao:
        return isTaskOrTransport ? TaskStateDto.Aao : TaskStateDto.Detached;
      case TaskStateDto.Aao:
        return TaskStateDto.Detached;
      default:
        return null;
    }
  }
}

interface TaskDialogOptions {
  readonly currentState: TaskStateDto;
  readonly nextState: TaskStateDto;
  readonly info: string;
  readonly button: string;
}

interface UnitInfo {
  readonly call: string;
  readonly state: TaskStateDto;
}
