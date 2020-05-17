import {Component, Input} from '@angular/core';

import {TaskDto} from 'mls-coceso-api';

import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {TaskHelper} from '../../../helpers/task.helper';
import {UnitDataService} from '../../../services/unit.data.service';

@Component({
  selector: 'coceso-main-incident-task',
  templateUrl: './incident-task.component.html'
})
export class IncidentTaskComponent {

  readonly _task = new BehaviorSubject(null);

  @Input() set task(value: TaskDto) {
    this._task.next(value);
  }

  readonly unitCall: Observable<string>;

  constructor(private readonly unitService: UnitDataService, private readonly taskHelper: TaskHelper) {
    this.unitCall = this._task.pipe(switchMap(task => this.loadUnitCall(task)));
  }

  private loadUnitCall(task: TaskDto): Observable<string> {
    return task
        ? this.unitService.getById(task.unit).pipe(map(u => u ? u.call : ''))
        : of('');
  }

  nextState(): void {
    this.taskHelper.nextState(this._task.value);
  }
}
