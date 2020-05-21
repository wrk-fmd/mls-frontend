import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';

import {CommonModule} from '@angular/common';
import {Inject, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';

import {CommonI18nModule, TRANSLATE_REGISTRAR} from 'mls-common-i18n';
import de from '../i18n/de';
import en from '../i18n/en';

import {
  DialogComponent,
  FormErrorsComponent,
  FormMultilineComponent,
  FormServerComponent,
  FormTextComponent,
  WindowComponent,
  WinmanComponent
} from './components';
import {DropListGroupNameDirective} from './directives';
import {TrackingFormBuilder} from './forms';
import {NotificationService, WindowService} from './services';

@NgModule({
  declarations: [
    DropListGroupNameDirective,
    FormErrorsComponent, FormServerComponent, FormMultilineComponent, FormTextComponent,
    WinmanComponent, DialogComponent, WindowComponent
  ],
  imports: [
    // Angular
    CommonModule, ReactiveFormsModule,
    // Angular Material
    DragDropModule,
    PortalModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    // Translations
    CommonI18nModule
  ],
  exports: [
    DropListGroupNameDirective,
    FormErrorsComponent, FormServerComponent, FormMultilineComponent, FormTextComponent,
    WinmanComponent, DialogComponent, WindowComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'standard'}
    },
    NotificationService, WindowService, TrackingFormBuilder
  ]
})
export class CommonComponentsModule {
  constructor(@Inject(TRANSLATE_REGISTRAR) registerTranslations) {
    registerTranslations({en, de});
  }
}
