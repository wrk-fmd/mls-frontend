import {ModuleWithProviders, NgModule} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {WatchService} from './stomp/watch.service';
import {StompConfiguration} from './stomp.configuration';

/**
 * This module provides and configures the STOMP services
 */
@NgModule({
  imports: [],
  providers: [
    WatchService, RxStompService
  ],
})
export class StompModule {
  static forRoot(stompConfiguration: StompConfiguration): ModuleWithProviders {
    const rootUrl = buildWebSocketUrl(stompConfiguration.rootUrl);
    return {
      ngModule: StompModule,
      providers: [
        {
          provide: InjectableRxStompConfig,
          useValue: {
            brokerURL: `${rootUrl}/notifications`,
            reconnectDelay: 200
          }
        }
      ]
    };
  }
}

/**
 * This takes the root URL for the API and transforms it into an URL for the WebSocket protocol
 * @param rootUrl The absolute,
 */
function buildWebSocketUrl(rootUrl: string): string {
  if (/^https?:\/\//.test(rootUrl)) {
    // Full URL with scheme, just replace http/https with ws/wss
    return rootUrl.replace(/^http/, 'ws');
  }

  const scheme = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  if (rootUrl.startsWith('//')) {
    // Protocol-relative URL
    return scheme + rootUrl;
  }

  if (rootUrl.startsWith('/')) {
    // Absolute path
    return `${scheme}//${location.host}${rootUrl}`;
  }

  throw new Error('Encountered relative path as root URL for API');
}
