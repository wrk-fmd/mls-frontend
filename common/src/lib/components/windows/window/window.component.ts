import {Component, EventEmitter, Inject, Output, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {DialogComponent, DialogComponentOptions} from '../dialog/dialog.component';

/**
 * This component extends the basic dialog component acts as a wrapper for content displayed in a draggable dialog window
 */
@Component({
  templateUrl: './window.component.html',
  styleUrls: ['../dialog/dialog.component.scss', './window.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WindowComponent extends DialogComponent {

  @Output() readonly focused = new EventEmitter();

  readonly taskTitle: Observable<string>;

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogComponentOptions<any>) {
    super(data);
    this.taskTitle = this.component.pipe(switchMap(c => c.taskTitle || c.windowTitle));
  }
}
