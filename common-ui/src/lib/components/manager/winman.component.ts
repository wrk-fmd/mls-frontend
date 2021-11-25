import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {AfterViewInit, Component, ElementRef, Type, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {DialogComponentOptions, DialogContent} from '../dialog/dialog.component';
import {WindowComponent} from '../window/window.component';
import {WinmanMatDialog, WinmanOverlay, WinmanOverlayContainer} from './winman.dialog';

/**
 * This component displays windows and a taskbar
 */
@Component({
  selector: 'mls-window-manager',
  templateUrl: './winman.component.html',
  styleUrls: ['./winman.component.scss'],
  providers: [WinmanMatDialog, WinmanOverlay, WinmanOverlayContainer]
})
export class WinmanComponent implements AfterViewInit {

  windows: MatDialogRef<WindowComponent>[] = [];
  focused: MatDialogRef<WindowComponent> | null = null;

  private stack = new Set<MatDialogRef<WindowComponent>>();

  @ViewChild('winmanContainer', {static: true}) winmanContainer?: ElementRef;

  sizeStyle?: { width: string, height: string };
  extendShadow = true;

  constructor(private readonly dialog: WinmanMatDialog) {
  }

  ngAfterViewInit(): void {
    this.dialog.overlayContainer.setContainer(this.winmanContainer!.nativeElement);
  }

  /**
   * Open a new window
   * @param component The component type displayed as content
   * @param componentData The data passed to the component
   * @param options The options for the window
   */
  open<T>(component: Type<DialogContent<T>>, componentData?: T, options?: WindowOptions) {
    options = options || {};

    const dialogRef = this.dialog.open<WindowComponent, DialogComponentOptions<T>>(WindowComponent, {
      width: options.width || 'auto',
      height: options.height || 'auto',
      panelClass: 'dialog-window',
      hasBackdrop: false,
      disableClose: true,
      position: options,
      scrollStrategy: new NoopScrollStrategy(),
      data: {component, componentData}
    });

    this.focus(dialogRef);
    dialogRef.componentInstance.focused.subscribe(() => this.focus(dialogRef));
    dialogRef.afterClosed().subscribe(() => this.close(dialogRef));

    this.windows.push(dialogRef);
  }

  /**
   * Focus a specific window
   * @param dialogRef The dialog instance for the window
   */
  focus(dialogRef: MatDialogRef<WindowComponent>) {
    if (this.focused !== dialogRef) {
      // Focus the dialog
      // Hack: Cast dialog to any so we get access to private properties
      (dialogRef as any)._containerInstance._trapFocus();

      // Remove window from its previous position and add at the end
      this.stack.delete(dialogRef);
      this.stack.add(dialogRef);

      // Update the z-index for all windows
      let index = 1000 - this.stack.size;
      this.stack.forEach(ref => (ref as any)._overlayRef._host.style.zIndex = index++);

      // Store as focused so it is highlighted in the taskbar
      this.focused = dialogRef;
    }
  }

  private close(dialogRef: MatDialogRef<WindowComponent>) {
    this.windows = this.windows.filter(item => item !== dialogRef);

    // Remove from stack
    this.stack.delete(dialogRef);

    // Focus the next window if the closed window was focused
    if (this.focused === dialogRef) {
      // Find the last value
      let window = null;
      for (window of this.stack) {
      }

      // Set to the last value (might be null if no windows are left)
      this.focused = window;
    }
  }

  setSize(level: number) {
    if (level > 0) {
      const factor = `${100 + level * 50}%`;
      this.sizeStyle = {width: factor, height: factor};
      this.extendShadow = false;
    } else {
      this.sizeStyle = undefined;
      this.extendShadow = true;
    }
  }
}

export interface WindowOptions {
  width?: string;
  height?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}
