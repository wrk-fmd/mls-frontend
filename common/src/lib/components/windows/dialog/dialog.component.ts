import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {Component, ComponentRef, Inject, Type, ViewEncapsulation} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Observable, ReplaySubject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

/**
 * This component acts as a wrapper for content displayed in a dialog window
 */
@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent {

  readonly content: Portal<any>;
  readonly component = new ReplaySubject<DialogContent<any>>(1);

  readonly windowTitle: Observable<string>;

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: DialogComponentOptions<any>) {
    this.content = new ComponentPortal(data.component);
    this.windowTitle = this.component.pipe(switchMap(c => c.windowTitle));
  }

  /**
   * Set the constructed component and inject the data
   * @param componentRef The reference to the component
   */
  setComponent(componentRef: ComponentRef<DialogContent<any>>) {
    const component = componentRef.instance;
    component.data = this.data.componentData;

    // Connect to the component asynchronously to prevent circular changes
    setTimeout(() => this.component.next(component), 0);
  }
}

/**
 * The options for the dialog window
 */
export class DialogComponentOptions<T> {
  /** The component type for the content */
  component: Type<DialogContent<T>>;

  /** The data passed to the content component */
  componentData?: T;
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
 * @param <T> The type of input data expected by the component
 */
export interface DialogContent<T = void> {
  data: T;
  windowTitle: Observable<string>;
  taskTitle?: Observable<string>;
}
