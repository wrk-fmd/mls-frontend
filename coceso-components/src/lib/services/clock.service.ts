import {Injectable} from '@angular/core';

import {SystemEndpointService} from 'mls-coceso-api';

import {Observable, timer} from 'rxjs';
import {distinctUntilChanged, map, shareReplay} from 'rxjs/operators';

@Injectable()
export class ClockService {

  private offset = 0;
  readonly timestamp: Observable<number>;

  constructor(private readonly endpoint: SystemEndpointService) {
    this.loadOffset();
    this.timestamp = timer(0, 500).pipe(
        map(() => Date.now() + this.offset),
        shareReplay(1)
    );
  }

  private loadOffset() {
    // Synchronize with the server clock, including RTT
    const start = Date.now();
    this.endpoint.getSystemTime().subscribe(res => this.offset = 1000 * res.time - (start + Date.now()) / 2);
  }

  elapsedMinutes(sinceTimestamp: number): Observable<number> {
    return this.elapsed(sinceTimestamp, 60);
  }

  elapsedSeconds(sinceTimestamp: number): Observable<number> {
    return this.elapsed(sinceTimestamp, 1);
  }

  private elapsed(sinceTimestamp: number, unit: number) {
    sinceTimestamp = sinceTimestamp * 1000;
    return this.timestamp.pipe(
        map(current => current > sinceTimestamp ? Math.floor((current - sinceTimestamp) / (unit * 1000)) : 0),
        distinctUntilChanged()
    );
  }
}
