import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {LoggerModule} from 'ngx-logger';

import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {TokenInterceptor} from './auth/token.interceptor';
import {TokenService} from './auth/token.service';

/**
 * This module provides and configures the authentication
 */
@NgModule({
  imports: [
    LoggerModule.forChild(),
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
