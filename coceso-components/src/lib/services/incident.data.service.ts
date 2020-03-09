import {Injectable} from '@angular/core';

import {IncidentCreateDto, IncidentDto, IncidentEndpointService, IncidentUpdateDto} from 'mls-coceso-api';
import {DataService} from 'mls-common';
import {WatchService} from 'mls-stomp';

import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import {ConcernDataService} from './concern.data.service';

@Injectable()
export class IncidentDataService extends DataService<IncidentDto> {

  private readonly concernSubscription: Subscription;

  constructor(private readonly concernService: ConcernDataService, private readonly endpoint: IncidentEndpointService,
              private readonly watchService: WatchService) {
    super();
    this.concernSubscription = concernService.getActiveId().subscribe(concern => this.subscribeConcern(concern));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.concernSubscription.unsubscribe();
  }

  createIncident(data: IncidentCreateDto): Observable<number> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.createIncident({concern, data}).pipe(map(i => i.id))
    );
  }

  updateIncident(incident: number, data: IncidentUpdateDto): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.updateIncident({concern, incident, data})
    );
  }

  protected compare(a: IncidentDto, b: IncidentDto): number {
    if (a.state === 'Open' && b.state !== 'Open') {
      return -1;
    }
    if (b.state === 'Open' && a.state !== 'Open') {
      return 1;
    }

    if (a.priority && !b.priority) {
      return -1;
    }
    if (b.priority && !a.priority) {
      return 1;
    }

    if (a.blue && !b.blue) {
      return -1;
    }
    if (b.blue && !a.blue) {
      return 1;
    }

    return super.compare(a, b);
  }

  private subscribeConcern(concern: number) {
    if (concern) {
      this.subscribe(this.watchService.watchIncidents(concern));
    } else {
      this.unsubscribe();
    }
  }
}
