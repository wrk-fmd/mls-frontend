import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {Component, ComponentRef, EventEmitter, Inject, Output, Type, ViewEncapsulation} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Observable, ReplaySubject} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';

/**
 * This component acts as a wrapper for content displayed in a dialog window
 */
@Component({
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WindowComponent {

  readonly content: Portal<any>;
  readonly component = new ReplaySubject<DialogWindowContent>();

  @Output() readonly focused = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: WindowComponentOptions) {
    this.content = new ComponentPortal(data.component);
  }

  /**
   * Set the constructed component and inject the data
   * @param componentRef The reference to the component
   */
  setComponent(componentRef: ComponentRef<DialogWindowContent>) {
    const component = componentRef.instance;
    component.data = this.data.componentData;
    this.component.next(component);
  }

  get windowTitle(): Observable<string> {
    return this.component.pipe(flatMap(c => c.windowTitle));
  }

  get taskTitle(): Observable<string> {
    return this.component.pipe(flatMap(c => c.taskTitle));
  }

  get actions(): Observable<DialogActionButton[]> {
    return this.component.pipe(map(c => c.actions));
  }
}

/**
 * The options for the dialog window
 */
export class WindowComponentOptions {
  /** The component type for the content */
  component: Type<DialogWindowContent>;

  /** The data passed to the content component */
  componentData?: any;
}

/**
 * A button displayed in the actions section of the dialog window
 */
export interface DialogActionButton {
  label: string;
  action: () => void;
  color?: ThemePalette;
  filled?: boolean;
  disabled?: boolean;
}

/**
 * The interface implemented by every component that should be displayed as content
 */
export interface DialogWindowContent {
  data: any;
  windowTitle: Observable<string>;
  taskTitle: Observable<string>;
  actions?: DialogActionButton[];
}

