/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthApiConfiguration, AuthApiConfigurationParams } from './auth-api-configuration';

import { AuthenticationEndpointService } from './services/authentication-endpoint.service';
import { ConcernEndpointService } from './services/concern-endpoint.service';
import { UnitEndpointService } from './services/unit-endpoint.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthenticationEndpointService,
    ConcernEndpointService,
    UnitEndpointService,
    AuthApiConfiguration
  ],
})
export class AuthApiModule {
  static forRoot(params: AuthApiConfigurationParams): ModuleWithProviders<AuthApiModule> {
    return {
      ngModule: AuthApiModule,
      providers: [
        {
          provide: AuthApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: AuthApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('AuthApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
