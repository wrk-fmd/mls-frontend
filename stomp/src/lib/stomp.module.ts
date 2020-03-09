import {ModuleWithProviders, NgModule} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';

import {WatchService} from './stomp';
import {StompConfiguration} from './stomp.configuration';

/**
 * This module provides and configures the STOMP services
 */
@NgModule()
export class StompModule {
  static forRoot(stompConfiguration: StompConfiguration): ModuleWithProviders<StompModule> {
    return {
      ngModule: StompModule,
      providers: [
        WatchService, RxStompService, {
          provide: InjectableRxStompConfig,
          useValue: {
            brokerURL: `${stompConfiguration.rootUrl}/notifications`,
            reconnectDelay: 200
          }
        }
      ]
    };
  }
}
