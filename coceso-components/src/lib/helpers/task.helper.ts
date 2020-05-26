import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {IncidentTypeDto, TaskDto, TaskStateDto} from 'mls-coceso-api';
import {TrackingFormControl} from 'mls-common-forms';
import {DialogComponent, DialogComponentOptions} from 'mls-common-ui';

import {TaskDialogComponent} from '../components/main/task-dialog/task-dialog.component';

@Injectable()
export class TaskHelper {

  constructor(private readonly dialog: MatDialog) {
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

    // TODO Check if next state is possible
    this.dialog.open<DialogComponent, DialogComponentOptions<any>>(DialogComponent, {
      panelClass: 'dialog-window',
      disableClose: true,
      data: {component: TaskDialogComponent, componentData: {incident: task.incident, unit: task.unit}}
    });
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
