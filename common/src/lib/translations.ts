import {TranslateService} from '@ngx-translate/core';
import translationsDe from '../i18n/de';
import translationsEn from '../i18n/en';

/**
 * This function registers the common translations with the TranslateService
 */
export function registerTranslations(translate: TranslateService) {
  return () => {
    translate.setTranslation('en', translationsEn);
    translate.setTranslation('de', translationsDe);
    translate.setDefaultLang('en');
    translate.use(translate.getBrowserLang());
  };
}

export function getLocaleId(translate: TranslateService) {
  return translate.getBrowserCultureLang();
}
