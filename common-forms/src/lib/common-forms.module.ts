import {DragDropModule} from '@angular/cdk/drag-drop';

import {CommonModule} from '@angular/common';
import {Inject, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {CommonI18nModule, TRANSLATE_REGISTRAR, Translations} from 'mls-common-i18n';
import de from '../i18n/de';
import en from '../i18n/en';

import {FormErrorsComponent, FormMultilineComponent, FormServerComponent, FormTextComponent} from './components';
import {DropListGroupNameDirective} from './directives';
import {TrackingFormBuilder} from './forms';
import {NotificationService} from './services';

@NgModule({
  declarations: [
    DropListGroupNameDirective,
    FormErrorsComponent, FormServerComponent, FormMultilineComponent, FormTextComponent
  ],
  imports: [
    // Angular
    CommonModule, ReactiveFormsModule,
    // Angular Material
    DragDropModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    // Translations
    CommonI18nModule
  ],
  exports: [
    DropListGroupNameDirective,
    FormErrorsComponent, FormServerComponent, FormMultilineComponent, FormTextComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'}
    },
    NotificationService, TrackingFormBuilder
  ]
})
export class CommonFormsModule {
  constructor(@Inject(TRANSLATE_REGISTRAR) registerTranslations: (translations: Translations) => void) {
    registerTranslations({en, de});
  }
}
