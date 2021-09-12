import {Injectable} from '@angular/core';

import {CocesoWatchService, SendMessageDto, UnitCreateDto, UnitDto, UnitEndpointService, UnitUpdateDto} from 'mls-coceso-api';
import {DataService} from 'mls-common-data';

import {EMPTY, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ConcernDataService} from './concern.data.service';

@Injectable()
export class UnitDataService extends DataService<UnitDto> {

  constructor(private readonly concernService: ConcernDataService, private readonly endpoint: UnitEndpointService,
              watchService: CocesoWatchService) {
    super(concernService.getActiveId().pipe(switchMap(c => c ? watchService.watchUnits(c) : EMPTY)));
  }

  createUnit(body: UnitCreateDto): Observable<number> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.createUnit({concern, body}).pipe(map(i => i.id))
    );
  }

  updateUnit(unit: number, body: UnitUpdateDto): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.updateUnit({concern, unit, body})
    );
  }

  assignCrewMember(unit: number, member: number): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.assignCrewMember({concern, unit, member})
    );
  }

  removeCrewMember(unit: number, member: number): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.removeCrewMember({concern, unit, member})
    );
  }

  sendHome(unit: number): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.sendHome({concern, unit})
    );
  }

  standby(unit: number): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.standby({concern, unit})
    );
  }

  holdPosition(unit: number): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.holdPosition({concern, unit})
    );
  }

  sendMessage(unit: number, body: SendMessageDto) {
    return this.concernService.runWithConcern(
        concern => this.endpoint.sendMessage({concern, unit, body})
    );
  }

  protected defaultSort(): ((a: UnitDto, b: UnitDto) => number)[] {
    return [
      (a, b) => a.call.localeCompare(b.call),
      ...super.defaultSort()
    ];
  }
}
