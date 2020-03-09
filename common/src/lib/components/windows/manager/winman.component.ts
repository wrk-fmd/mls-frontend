import {AfterViewInit, Component, ElementRef, Type, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DialogWindowContent, WindowComponent, WindowComponentOptions} from '../window/window.component';
import {WinmanMatDialog, WinmanOverlay, WinmanOverlayContainer} from './winman.dialog';

/**
 * This component displays windows and a taskbar
 */
@Component({
  selector: 'window-manager',
  templateUrl: './winman.component.html',
  styleUrls: ['./winman.component.scss'],
  providers: [WinmanMatDialog, WinmanOverlay, WinmanOverlayContainer]
})
export class WinmanComponent implements AfterViewInit {

  windows: MatDialogRef<WindowComponent>[] = [];
  focused: MatDialogRef<WindowComponent>;

  @ViewChild('winmanContainer', {static: true}) winmanContainer: ElementRef;

  constructor(private readonly dialog: WinmanMatDialog) {
  }

  ngAfterViewInit(): void {
    this.dialog.overlayContainer.setContainer(this.winmanContainer.nativeElement);
  }

  /**
   * Open a new window
   * @param component The component type displayed as content
   * @param componentData The data passed to the component
   * @param options The options for the window
   */
  open(component: Type<DialogWindowContent>, componentData?: any, options?: WindowOptions) {
    options = options || {};

    const dialogRef = this.dialog.open<WindowComponent, WindowComponentOptions>(WindowComponent, {
      width: options.width || 'auto',
      height: options.height || 'auto',
      panelClass: 'dialog-window',
      hasBackdrop: false,
      disableClose: true,
      data: {component, componentData}
    });

    this.focused = dialogRef;

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
      // Hack: Cast dialog to any so we get access to private properties
      const dialog = dialogRef as any;

      // Move DOM node as last child in list, causing it to be on top
      dialog._overlayRef._host.parentNode.appendChild(dialog._overlayRef._host);

      // Focus the dialog
      dialog._containerInstance._trapFocus();

      this.focused = dialogRef;
    }
  }

  private close(dialogRef: MatDialogRef<WindowComponent>) {
    this.windows = this.windows.filter(item => item !== dialogRef);
  }
}

export interface WindowOptions {
  width?: string;
  height?: string;
}
