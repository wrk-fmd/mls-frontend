import {Inject, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';

import {AuthApiModule} from 'mls-auth-api';
import {AuthLoginModule} from 'mls-auth-login';
import {CocesoApiModule} from 'mls-coceso-api';
import {buildWebSocketUrl, CommonDataModule} from 'mls-common-data';
import {CommonI18nModule, TRANSLATE_REGISTRAR} from 'mls-common-i18n';

import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';

import {environment} from '../environments/environment';
import de from '../i18n/de';
import en from '../i18n/en';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

const stompUrl = buildWebSocketUrl(environment.apiUrl);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular
    BrowserModule, BrowserAnimationsModule,
    // Translation
    TranslateModule.forRoot(),
    // Logging
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
    // MLS
    AuthApiModule.forRoot({rootUrl: environment.apiUrl + '/auth'}),
    CocesoApiModule.forRoot({rootUrl: environment.apiUrl + '/coceso'}),
    CommonDataModule.forRoot({rootUrl: stompUrl}),
    CommonI18nModule.forRoot(),
    AuthLoginModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(TRANSLATE_REGISTRAR) registerTranslations) {
    registerTranslations({en, de});
  }
}
