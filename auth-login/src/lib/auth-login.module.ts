import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Inject, NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';

import {REQUEST_TOKEN} from 'mls-common-data';
import {CommonI18nModule, TRANSLATE_REGISTRAR, Translations} from 'mls-common-i18n';
import {LoggerModule} from 'ngx-logger';

import de from '../i18n/de';
import en from '../i18n/en';

import {LoginComponent} from './components';
import {AuthGuard, AuthService, TokenInterceptor, TokenService} from './services';

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
    CommonI18nModule,
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
    {
      provide: REQUEST_TOKEN,
      useFactory: (tokenService: TokenService) => tokenService.requestToken,
      deps: [TokenService]
    }
  ],
})
export class AuthLoginModule {
  constructor(@Inject(TRANSLATE_REGISTRAR) registerTranslations: (translations: Translations) => void) {
    registerTranslations({en, de});
  }
}
