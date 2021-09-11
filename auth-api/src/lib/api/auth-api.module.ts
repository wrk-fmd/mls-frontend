/* eslint-disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthApiConfiguration, AuthApiConfigurationInterface } from './auth-api-configuration';

import { AuthenticationEndpointService } from './services/authentication-endpoint.service';
import { ConcernEndpointService } from './services/concern-endpoint.service';
import { UnitEndpointService } from './services/unit-endpoint.service';

/**
 * Provider for all AuthApi services, plus AuthApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthApiConfiguration,
    AuthenticationEndpointService,
    ConcernEndpointService,
    UnitEndpointService
  ],
})
export class AuthApiModule {
  static forRoot(customParams: AuthApiConfigurationInterface): ModuleWithProviders<AuthApiModule> {
    return {
      ngModule: AuthApiModule,
      providers: [
        {
          provide: AuthApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
