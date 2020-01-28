import {CommonModule} from '@angular/common';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {AuthApiModule, AuthModule} from 'mls-auth-api';
import {registerTranslations} from './translations';
import {UnitTokenConcernsComponent, UnitTokenListComponent, UnitTokenPageComponent} from './components';
import {AuthRoutingModule} from './auth-routing.module';
import {QRCodeModule} from "angularx-qrcode";

const imports = [
  // Angular
  CommonModule, FormsModule, ReactiveFormsModule,
  // Angular Material
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatToolbarModule,
  // MLS modules
  AuthModule,
  AuthRoutingModule
];

@NgModule({
  declarations: [
    UnitTokenConcernsComponent, UnitTokenListComponent, UnitTokenPageComponent
  ],
  imports: [
    ...imports,
    TranslateModule.forChild(),
    QRCodeModule,
    AuthApiModule
  ],
  exports: imports,
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: registerTranslations,
      deps: [TranslateService],
      multi: true
    }
  ]
})
export class AuthComponentsModule {
}
