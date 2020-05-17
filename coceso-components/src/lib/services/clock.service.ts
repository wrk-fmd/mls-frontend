import {Injectable} from '@angular/core';

import {SystemEndpointService} from 'mls-coceso-api';

import {Observable, timer} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable()
export class ClockService {

  private offset = 0;
  readonly timestamp: Observable<number>;

  constructor(private readonly endpoint: SystemEndpointService) {
    this.loadOffset();
    this.timestamp = timer(0, 1000).pipe(
        map(() => Date.now() + this.offset),
        shareReplay(1)
    );
  }

  private loadOffset() {
    // TODO This does not take the RTT into account
    this.endpoint.getSystemTime().subscribe(res => this.offset = 1000 * res.time - Date.now());
  }

  elapsedMinutes(sinceTimestamp: number): Observable<number> {
    sinceTimestamp = sinceTimestamp * 1000;
    return this.timestamp.pipe(map(current => current > sinceTimestamp ? Math.floor((current - sinceTimestamp) / 60000) : 0));
  }
}
