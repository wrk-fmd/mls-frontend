import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de-AT';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {AuthModule} from 'mls-auth-api';

import {LoginComponent} from './components';
import {getLocaleId, registerTranslations} from './translations';

registerLocaleData(localeDe);

const imports = [
  // Angular
  FormsModule, ReactiveFormsModule,
  // Angular Material
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  // API
  AuthModule
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ...imports,
    TranslateModule.forChild()
  ],
  exports: [
    ...imports,
    LoginComponent
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
    }
  ]
})
export class CommonComponentsModule {
}
