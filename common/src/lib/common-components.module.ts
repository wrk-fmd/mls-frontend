import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de-AT';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';

import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {LoginComponent, WindowComponent, WinmanComponent} from './components';
import {TrackingFormBuilder} from './forms';
import {WindowService} from './services';
import {getLocaleId, registerTranslations} from './translations';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    LoginComponent, WinmanComponent, WindowComponent
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
    TranslateModule.forChild()
  ],
  exports: [
    LoginComponent, WinmanComponent, WindowComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: getLocaleId,
      deps: [TranslateService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: registerTranslations,
      deps: [TranslateService],
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'standard'}
    },
    WindowService, TrackingFormBuilder
  ]
})
export class CommonComponentsModule {
}
