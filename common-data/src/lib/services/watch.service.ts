import {Inject, Injectable, InjectionToken} from '@angular/core';
import {InjectableRxStompConfig, RxStompRPCService, RxStompService} from '@stomp/ng2-stompjs';

import {Observable, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {DeletionDto, ReplayStartDto} from '../models';

/**
 * This observable contains the request token used for authentication
 */
export const REQUEST_TOKEN = new InjectionToken<Observable<string>>('JWT request token provider');

/**
 * This service provides methods for watching data through STOMP
 */
@Injectable()
export class WatchService {

  private readonly subscriptionPrefix: string;
  private subscriptionCounter = 0;

  private readonly tokenSubscription: Subscription;
  private token: string | null = null;

  constructor(private readonly stompService: RxStompService,
              private readonly rpcService: RxStompRPCService,
              stompConfig: InjectableRxStompConfig,
              @Inject(REQUEST_TOKEN) requestToken: Observable<string>) {
    // Subscribe to changes of the request token
    this.tokenSubscription = requestToken.subscribe(token => this.tokenChanged(token));

    // Send the (dynamic) token with each CONNECT frame
    stompConfig.connectHeaders = stompConfig.connectHeaders || {};
    Object.defineProperties(stompConfig.connectHeaders, {
      token: {get: () => this.token, enumerable: true}
    });

    // Set the configuration for STOMP
    this.stompService.configure(stompConfig);

    // Generate a unique prefix for all subscriptions
    this.subscriptionPrefix = Math.random().toString(16).substring(2);
  }

  private tokenChanged(token: string) {
    this.token = token;
    if (!token) {
      // No token: Disconnect
      this.stompService.deactivate();
    } else if (!this.stompService.active) {
      // STOMP was not active: Activate now
      this.stompService.activate();
    } else {
      try {
        // STOMP was already active: Just send the new token as message
        this.stompService.publish({destination: 'authenticate', headers: {token}, retryIfDisconnected: false});
      } catch (_) {
        // Ignore, if the socket is currently not connected the token will be sent upon reconnect
      }
    }
  }

  watch<T>(path: string, key?: any): Observable<T | DeletionDto | ReplayStartDto> {
    key = key || '';

    const headers = {
      id: `${this.subscriptionPrefix}-sub${this.subscriptionCounter++}`
    };

    // TODO This only considers the last message for this channel
    //      maybe use a combination of subscription receipt and overall last connection?
    let lastConnection: number;
    Object.defineProperties(headers, {
      'last-connection': {get: () => lastConnection || null, enumerable: true}
    });

    return this.stompService.watch(`/exchange/${path}/${key}`, headers).pipe(
        tap(_ => lastConnection = Math.floor(Date.now() / 1000)),
        map(message => JSON.parse(message.body))
    );
  }

  request<T, R>(path: string, body: T): Observable<R> {
    return this.rpcService.stream({
      destination: `/exchange/${path}/`,
      body: JSON.stringify(body)
    }).pipe(
        map(message => JSON.parse(message.body))
    );
  }
}
