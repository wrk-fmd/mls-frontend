import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';

import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {TokenInterceptor} from './auth/token.interceptor';
import {TokenService} from './auth/token.service';

/**
 * This module provides and configures the authentication
 */
@NgModule({
  imports: [
    HttpClientModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
  ],
  providers: [
    AuthGuard, AuthService, TokenService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
})
export class AuthModule {
}
