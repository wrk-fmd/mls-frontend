import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';

import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {QRCodeModule} from 'angularx-qrcode';

import translationsDe from '../i18n/de';
import translationsEn from '../i18n/en';

import {AuthRoutingModule} from './auth-routing.module';
import {UnitTokenConcernsComponent, UnitTokenListComponent, UnitTokenPageComponent} from './components';

@NgModule({
  declarations: [
    UnitTokenConcernsComponent, UnitTokenListComponent, UnitTokenPageComponent
  ],
  imports: [
    // Angular
    CommonModule, ReactiveFormsModule,
    // Angular Material
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    // Translations
    TranslateModule.forChild(),
    // QR Codes
    QRCodeModule,
    // MLS modules
    AuthRoutingModule
  ],
  providers: []
})
export class AuthComponentsModule {
  constructor(translate: TranslateService) {
    translate.setTranslation('en', translationsEn, true);
    translate.setTranslation('de', translationsDe, true);
  }
}
