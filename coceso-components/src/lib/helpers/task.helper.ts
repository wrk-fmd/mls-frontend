import {Injectable} from '@angular/core';
import {IncidentTypeDto, TaskDto, TaskStateDto} from 'mls-coceso-api';
import {NotificationService, TrackingFormControl} from 'mls-common-forms';
import {TaskService} from '../services/task.service';

@Injectable()
export class TaskHelper {

  constructor(private readonly taskService: TaskService, private readonly notificationService: NotificationService) {
  }

  getTaskControls(tasks: TaskDto[], existing: TaskFormControl[]): TaskFormControl[] {
    existing = existing || [];

    // Add controls for all tasks from server
    const controls = tasks.map(task => {
      const control = existing.find(c => c.matches(task));
      if (!control) {
        // Add a new control if none already exists
        return new TaskFormControl(task);
      }

      // Update the existing control
      control.setServerValue(task.state);
      control.isNew = false;
      return control;
    });

    // Add all controls that are still marked as new (i.e., unsafed local changes)
    controls.push(...existing.filter(c => c.isNew));
    return controls;
  }

  statesForType(type: IncidentTypeDto): TaskStateDto[] {
    switch (type) {
      case IncidentTypeDto.Standby:
        return [TaskStateDto.Assigned, TaskStateDto.ABO, TaskStateDto.Detached];
      case IncidentTypeDto.Position:
      case IncidentTypeDto.ToHome:
        return [TaskStateDto.Assigned, TaskStateDto.ZBO, TaskStateDto.ABO, TaskStateDto.Detached];
      case IncidentTypeDto.Task:
      case IncidentTypeDto.Transport:
        return [TaskStateDto.Assigned, TaskStateDto.ZBO, TaskStateDto.ABO, TaskStateDto.ZAO, TaskStateDto.AAO, TaskStateDto.Detached];
    }

    return [];
  }

  nextState(task: TaskDto): void {
    if (!task) {
      return;
    }

    // TODO Replace with confirmation dialog
    const state = this.calculateNextState(task.state as TaskStateDto);
    if (state) {
      this.taskService.setState(task.incident, task.unit, state)
          .subscribe(this.notificationService.onError('task.error'));
    }
  }

  private calculateNextState(currentState: TaskStateDto): TaskStateDto {
    switch (currentState) {
      case 'Assigned':
        return TaskStateDto.ZBO;
      case 'ZBO':
        return TaskStateDto.ABO;
      case 'ABO':
        return TaskStateDto.ZAO;
      case 'ZAO':
        return TaskStateDto.AAO;
      case 'AAO':
        return TaskStateDto.Detached;
    }

    return null;
  }
}

export class TaskFormControl extends TrackingFormControl {

  readonly incident: number;
  readonly unit: number;
  isNew: boolean;

  constructor(task: TaskDto) {
    super(task.state, null, null);
    this.incident = task.incident;
    this.unit = task.unit;
  }

  matches(task: TaskDto): boolean {
    return this.incident === task.incident && this.unit === task.unit;
  }
}
