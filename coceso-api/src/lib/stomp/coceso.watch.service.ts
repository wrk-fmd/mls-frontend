import {Injectable} from '@angular/core';
import {DeletionDto, ReplayStartDto, WatchService} from 'mls-common-data';
import {Observable} from 'rxjs';

import {GeocodingResult} from '../geocoding';
import {ConcernDto, ContainerDto, IncidentDto, PointDto, ReceivedMessageDto, UnitDto} from '../rest/models';

/**
 * This service provides methods for watching data through STOMP
 */
@Injectable()
export class CocesoWatchService {

  constructor(private readonly watchService: WatchService) {
  }

  watchConcerns(): Observable<ConcernDto | DeletionDto | ReplayStartDto> {
    return this.watchService.watch<ConcernDto>('concerns');
  }

  watchIncidents(concern: number): Observable<IncidentDto | DeletionDto | ReplayStartDto> {
    return this.watchService.watch<IncidentDto>('incidents', concern);
  }

  watchUnits(concern: number): Observable<UnitDto | DeletionDto | ReplayStartDto> {
    return this.watchService.watch<UnitDto>('units', concern);
  }

  watchContainers(concern: number): Observable<ContainerDto | DeletionDto | ReplayStartDto> {
    return this.watchService.watch<ContainerDto>('containers', concern);
  }

  watchMessages(): Observable<ReceivedMessageDto | DeletionDto | ReplayStartDto> {
    return this.watchService.watch<ReceivedMessageDto>('messages');
  }

  requestGeocode(body: PointDto): Observable<GeocodingResult> {
    return this.watchService.request<PointDto, GeocodingResult>('geocoding.requests', body);
  }
}
