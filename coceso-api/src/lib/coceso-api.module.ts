import {ModuleWithProviders, NgModule} from '@angular/core';
import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';

import {buildWebSocketUrl, CommonDataModule} from 'mls-common-data';

import {CocesoRestConfiguration, CocesoRestConfigurationParams} from './rest/coceso-rest-configuration';
import {CocesoRestModule} from './rest/coceso-rest.module';
import {CocesoWatchService} from './stomp/coceso.watch.service';

@NgModule({
  imports: [
    CocesoRestModule, CommonDataModule
  ]
})
export class CocesoApiModule {
  static forRoot(customParams: CocesoRestConfigurationParams): ModuleWithProviders<CocesoApiModule> {
    return {
      ngModule: CocesoApiModule,
      providers: [
        {
          provide: CocesoRestConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        },
        {
          provide: InjectableRxStompConfig,
          useValue: {
            brokerURL: `${buildWebSocketUrl(customParams.rootUrl)}/notifications`,
            reconnectDelay: 1000
          }
        },
        CocesoWatchService
      ]
    };
  }
}
