import {Injectable} from '@angular/core';
import {TaskDto, TaskStateDto} from 'mls-coceso-api';
import {NotificationService} from 'mls-common-forms';
import {TaskService} from '../services/task.service';

@Injectable()
export class TaskHelper {

  constructor(private readonly taskService: TaskService, private readonly notificationService: NotificationService) {
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
