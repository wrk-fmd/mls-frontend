import {ModuleWithProviders, NgModule} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';

import {WatchService} from './services';
import {StompConfiguration} from './stomp.configuration';

/**
 * This module provides and configures the STOMP services
 */
@NgModule()
export class CommonDataModule {
  static forRoot(stompConfiguration: StompConfiguration): ModuleWithProviders<CommonDataModule> {
    return {
      ngModule: CommonDataModule,
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
