import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de-AT';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {AuthApiModule, AuthModule} from 'mls-auth-api';
import {CommonComponentsModule} from 'mls-common';

import {environment} from '../environments/environment';
import translationsDe from '../i18n/de';
import translationsEn from '../i18n/en';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // Translation
    TranslateModule.forRoot(),
    // MLS
    AuthApiModule.forRoot({rootUrl: environment.apiUrl + '/auth'}),
    AuthModule,
    // StompModule,
    CommonComponentsModule,
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
  entryComponents: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
