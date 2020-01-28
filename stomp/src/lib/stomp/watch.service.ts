import {Injectable} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TokenService} from 'mls-auth-api';

/**
 * This service provides methods for watching data through STOMP
 */
@Injectable()
export class WatchService {

  constructor(private readonly stompService: RxStompService,
              private readonly stompConfig: InjectableRxStompConfig,
              private readonly tokenService: TokenService) {
    tokenService.renewalToken.subscribe(token => this.tokenChanged(token));
  }

  private tokenChanged(token: string) {
    if (!token) {
      this.stompService.deactivate();
    } else if (!this.stompService.active) {
      this.stompConfig.connectHeaders = {...this.stompConfig.connectHeaders, token};
      this.stompService.configure(this.stompConfig);
      this.stompService.activate();
    }
  }

  private watch<T>(path: string, key: any): Observable<T> {
    return this.stompService.watch(`/exchange/${path}/${key}`).pipe(
        map(message => JSON.parse(message.body))
    );
  }
}
