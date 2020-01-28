import {TranslateService} from '@ngx-translate/core';
import translationsDe from '../i18n/de';
import translationsEn from '../i18n/en';

/**
 * This function registers the module translations with the TranslateService
 */
export function registerTranslations(translate: TranslateService) {
  return () => {
    translate.setTranslation('en', translationsEn, true);
    translate.setTranslation('de', translationsDe, true);
  };
}
