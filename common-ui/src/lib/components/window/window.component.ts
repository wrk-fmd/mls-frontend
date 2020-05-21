import {CdkDrag} from '@angular/cdk/drag-drop';
import {Component, EventEmitter, HostListener, Inject, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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

  @ViewChild(CdkDrag)
  cdkDrag: CdkDrag;

  private resize = false;
  private resizeN = false;
  private resizeS = false;
  private resizeW = false;
  private resizeE = false;
  private lastX: number;
  private lastY: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogComponentOptions<any>, private readonly dialog: MatDialogRef<WindowComponent>) {
    super(data);
    this.taskTitle = this.component.pipe(switchMap(c => c.taskTitle || c.windowTitle));
  }

  startResize(event: MouseEvent, pos: string) {
    this.resize = true;

    this.resizeN = pos.includes('n');
    this.resizeS = pos.includes('s');
    this.resizeW = pos.includes('w');
    this.resizeE = pos.includes('e');

    this.lastX = event.clientX;
    this.lastY = event.clientY;

    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.resize) {
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    const el = (this.dialog as any)._overlayRef.overlayElement;
    let left = el.offsetLeft;
    let top = el.offsetTop;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    if (this.resizeN) {
      // North
      top += y - this.lastY;
      height -= y - this.lastY;
    }

    if (this.resizeS) {
      // South
      height += y - this.lastY;
    }

    if (this.resizeW) {
      // West
      left += x - this.lastX;
      width -= x - this.lastX;
    }

    if (this.resizeE) {
      // East
      width += x - this.lastX;
    }

    // overlay.updateSize({height, width});
    this.dialog.updateSize(width + 'px', height + 'px');
    this.dialog.updatePosition({left: left + 'px', top: top + 'px'});

    this.lastX = x;
    this.lastY = y;
  }

  @HostListener('document:mouseup')
  stopResizing() {
    this.resize = null;
  }
}
