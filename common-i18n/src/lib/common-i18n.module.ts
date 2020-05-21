import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de-AT';
import {APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {getLocaleId, registerLocale, registerTranslations, TRANSLATE_REGISTRAR} from './translations';

@NgModule({
  imports: [
    TranslateModule.forChild()
  ],
  exports: [
    TranslateModule
  ],
  providers: []
})
export class CommonI18nModule {
  static forRoot(): ModuleWithProviders<CommonI18nModule> {
    registerLocaleData(localeDe);

    return {
      ngModule: CommonI18nModule,
      providers: [
        {
          provide: LOCALE_ID,
          useFactory: getLocaleId,
          deps: [TranslateService]
        },
        {
          provide: APP_INITIALIZER,
          useFactory: registerLocale,
          deps: [TranslateService],
          multi: true
        },
        {
          provide: TRANSLATE_REGISTRAR,
          useFactory: registerTranslations,
          deps: [TranslateService]
        }
      ]
    };
  }
}
