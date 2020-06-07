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

  getTaskControls<T extends TaskDto>(tasks: T[], existing: TaskFormControl<T>[], withServerValue: boolean): TaskFormControl<T>[] {
    tasks = tasks || [];
    existing = existing || [];

    // Add controls for all tasks from server
    const controls = tasks.map(task => {
      const control = existing.find(c => c.matches(task));
      if (!control) {
        // Add a new control if none already exists
        return new TaskFormControl(task, withServerValue);
      }

      // Update the existing control
      control.setTask(task, withServerValue);
      control.isNew = false;
      return control;
    });

    // Add all controls that are still marked as new (i.e., unsaved local changes)
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

export class TaskFormControl<T extends TaskDto> extends TrackingFormControl {

  isNew: boolean;

  constructor(public task: T, withServerValue: boolean) {
    super(TaskStateDto.Detached, null, null);
    this.isNew = !withServerValue;
    withServerValue ? this.setServerValue(task.state) : this.setValue(task.state);
  }

  setTask(task: T, withServerValue: boolean) {
    this.task = task;
    withServerValue ? this.setServerValue(task.state) : this.setValue(task.state);
  }

  matches(task: TaskDto): boolean {
    return (!this.task.incident || this.task.incident === task.incident) && (!this.task.unit || this.task.unit === task.unit);
  }
}
