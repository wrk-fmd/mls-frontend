import {Injectable} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';

import {TokenService} from 'mls-auth-login';
import {ConcernDto, ContainerDto, IncidentDto, UnitDto} from 'mls-coceso-api';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {DeletionDto} from './deletion.dto';
import {ReplayStartDto} from './replay-start.dto';

/**
 * This service provides methods for watching data through STOMP
 */
@Injectable()
export class WatchService {

  private readonly subscriptionPrefix: string;
  private subscriptionCounter = 0;

  constructor(private readonly stompService: RxStompService,
              private readonly stompConfig: InjectableRxStompConfig,
              private readonly tokenService: TokenService) {
    tokenService.renewalToken.subscribe(token => this.tokenChanged(token));
    this.subscriptionPrefix = Math.random().toString(16);
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

  private watch<T>(path: string, key?: any): Observable<T | DeletionDto | ReplayStartDto> {
    key = key || '';
    return this.stompService.watch(`/exchange/${path}/${key}`, {
      id: `${this.subscriptionPrefix}-sub${this.subscriptionCounter++}`
    }).pipe(
        map(message => JSON.parse(message.body))
    );
  }

  watchConcerns(): Observable<ConcernDto | DeletionDto | ReplayStartDto> {
    return this.watch<ConcernDto>('concerns');
  }

  watchIncidents(concern: number): Observable<IncidentDto | DeletionDto | ReplayStartDto> {
    return this.watch<IncidentDto>('incidents', concern);
  }

  watchUnits(concern: number): Observable<UnitDto | DeletionDto | ReplayStartDto> {
    return this.watch<UnitDto>('units', concern);
  }

  watchContainers(concern: number): Observable<ContainerDto | DeletionDto | ReplayStartDto> {
    return this.watch<ContainerDto>('containers', concern);
  }
}
