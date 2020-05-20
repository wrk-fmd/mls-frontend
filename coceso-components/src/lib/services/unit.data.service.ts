import {Injectable, OnDestroy} from '@angular/core';

import {UnitCreateDto, UnitDto, UnitEndpointService, UnitUpdateDto} from 'mls-coceso-api';
import {DataService} from 'mls-common-data';

import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import {CocesoWatchService} from './coceso.watch.service';
import {ConcernDataService} from './concern.data.service';

@Injectable()
export class UnitDataService extends DataService<UnitDto> implements OnDestroy {

  private readonly concernSubscription: Subscription;

  constructor(private readonly concernService: ConcernDataService, private readonly endpoint: UnitEndpointService,
              private readonly watchService: CocesoWatchService) {
    super();
    this.concernSubscription = concernService.getActiveId().subscribe(concern => this.subscribeConcern(concern));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.concernSubscription.unsubscribe();
  }

  createUnit(data: UnitCreateDto): Observable<number> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.createUnit({concern, data}).pipe(map(i => i.id))
    );
  }

  updateUnit(unit: number, data: UnitUpdateDto): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.updateUnit({concern, unit, data})
    );
  }

  assignCrewMember(unit: number, member: number): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.assignCrewMember({concern, unit, member})
    );
  }

  removeCrewMember(unit: number, member: number): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.removeCrewMember({concern, unit, member})
    );
  }

  sendHome(unit: number): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.sendHome({concern, unit})
    );
  }

  standby(unit: number): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.standby({concern, unit})
    );
  }

  holdPosition(unit: number): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.holdPosition({concern, unit})
    );
  }

  protected compare(a: UnitDto, b: UnitDto): number {
    if (a.call !== b.call) {
      return a.call < b.call ? -1 : 1;
    }

    return super.compare(a, b);
  }

  private subscribeConcern(concern: number) {
    if (concern) {
      this.subscribe(this.watchService.watchUnits(concern));
    } else {
      this.unsubscribe();
    }
  }
}
