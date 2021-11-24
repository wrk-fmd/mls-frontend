import {InjectionToken} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

export type Translations = { [lang: string]: any };
export const TRANSLATE_REGISTRAR = new InjectionToken<(translations: Translations) => void>('register translations');

/**
 * This function registers translations with the TranslateService
 */
export function registerTranslations(translate: TranslateService) {
  return (translations: Translations) => {
    Object.entries(translations).forEach(([lang, data]) => translate.setTranslation(lang, data, true));
  };
}

/**
 * This function registers the locale with the TranslateService
 */
export function registerLocale(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('en');
    translate.use(translate.getBrowserLang() || 'en');
  };
}

export function getLocaleId(translate: TranslateService) {
  return translate.getBrowserCultureLang();
}
