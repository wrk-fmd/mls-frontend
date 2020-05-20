import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';

import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LoggerModule} from 'ngx-logger';

import {LoginComponent} from './components';
import {AuthGuard, AuthService, TokenInterceptor, TokenService} from './services';

import translationsDe from '../i18n/de';
import translationsEn from '../i18n/en';

/**
 * This module provides and configures the authentication
 */
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    // Angular
    CommonModule, ReactiveFormsModule,
    // Angular Material
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    // Translations
    TranslateModule.forChild(),
    // Logging
    LoggerModule.forChild(),
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AuthGuard, AuthService, TokenService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
})
export class AuthLoginModule {
  constructor(translate: TranslateService) {
    translate.setTranslation('en', translationsEn, true);
    translate.setTranslation('de', translationsDe, true);
  }
}
