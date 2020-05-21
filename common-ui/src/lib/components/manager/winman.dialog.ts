// These classes override the default MatDialog services to allow setting a custom container

import {Overlay, OverlayContainer} from '@angular/cdk/overlay';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class WinmanMatDialog extends MatDialog {
  constructor(matDialog: MatDialog, overlay: WinmanOverlay, readonly overlayContainer: WinmanOverlayContainer) {
    super(
        overlay, (matDialog as any)._injector, (matDialog as any)._location, (matDialog as any)._defaultOptions,
        (matDialog as any)._scrollStrategy, matDialog, overlayContainer
    );
  }
}

@Injectable()
export class WinmanOverlay extends Overlay {
  constructor(overlay: Overlay, overlayContainer: WinmanOverlayContainer) {
    super(
        (overlay as any)._scrollStrategies, overlayContainer, (overlay as any)._componentFactoryResolver, (overlay as any)._positionBuilder,
        (overlay as any)._keyboardDispatcher, (overlay as any)._injector, (overlay as any)._ngZone, (overlay as any)._document,
        (overlay as any)._directionality, (overlay as any)._location
    );
  }
}

@Injectable()
export class WinmanOverlayContainer extends OverlayContainer {

  setContainer(element: HTMLElement): void {
    this._containerElement = element;
  }

  protected _createContainer(): void {
  }
}
