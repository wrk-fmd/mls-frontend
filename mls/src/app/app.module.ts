import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de-AT';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {AuthApiModule} from 'mls-auth-api';
import {AuthLoginModule} from 'mls-auth-login';
import {CocesoApiModule} from 'mls-coceso-api';
import {buildWebSocketUrl, StompModule} from 'mls-stomp';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';

import {environment} from '../environments/environment';
import translationsDe from '../i18n/de';
import translationsEn from '../i18n/en';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

registerLocaleData(localeDe);

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
    StompModule.forRoot({rootUrl: stompUrl}),
    AuthLoginModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      // tslint:disable-next-line:only-arrow-functions
      useFactory: (translate: TranslateService) => function() {
        translate.setTranslation('en', translationsEn, true);
        translate.setTranslation('de', translationsDe, true);
      },
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
