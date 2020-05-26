import {Component, Input} from '@angular/core';

import {IncidentTypeDto, TaskStateDto} from 'mls-coceso-api';

import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {TaskFormControl, TaskHelper} from '../../../helpers';
import {UnitDataService} from '../../../services';

@Component({
  selector: 'coceso-main-incident-form-task',
  templateUrl: './incident-form-task.component.html',
  styleUrls: ['./incident-form-task.component.scss']
})
export class IncidentFormTaskComponent {

  private _control: TaskFormControl;

  @Input() set control(value: TaskFormControl) {
    this._control = value;
    this.unit.next(value ? value.unit : null);
  }

  get control(): TaskFormControl {
    return this._control;
  }

  @Input()
  type: IncidentTypeDto;

  @Input()
  showDuplicate: boolean;

  private readonly unit = new BehaviorSubject(null);
  readonly unitCall: Observable<string>;

  constructor(private readonly unitService: UnitDataService, private readonly taskHelper: TaskHelper) {
    this.unitCall = this.unit.pipe(switchMap(unit => this.loadUnitCall(unit)));
  }

  get states(): TaskStateDto[] {
    return this.taskHelper.statesForType(this.type);
  }

  private loadUnitCall(unit: number): Observable<string> {
    console.log(unit);
    return unit
        ? this.unitService.getById(unit).pipe(map(u => u ? u.call : ''))
        : of('');
  }
}
