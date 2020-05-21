import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import {DialogComponent, WindowComponent, WinmanComponent} from './components';
import {WindowService} from './services';

@NgModule({
  declarations: [
    WinmanComponent, DialogComponent, WindowComponent
  ],
  imports: [
    // Angular
    CommonModule,
    // Angular Material
    DragDropModule,
    PortalModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    WinmanComponent, DialogComponent, WindowComponent
  ],
  providers: [
    WindowService
  ]
})
export class CommonUiModule {
}
