import {Injectable} from '@angular/core';

import {CocesoWatchService, IncidentCreateDto, IncidentDto, IncidentEndpointService, IncidentUpdateDto, SendAlarmDto} from 'mls-coceso-api';
import {DataService} from 'mls-common-data';

import {EMPTY, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ConcernDataService} from './concern.data.service';

@Injectable()
export class IncidentDataService extends DataService<IncidentDto> {

  private alarmTemplates: { [key: string]: string } = {};

  constructor(private readonly concernService: ConcernDataService, private readonly endpoint: IncidentEndpointService,
              private readonly watchService: CocesoWatchService) {
    super(concernService.getActiveId().pipe(switchMap(c => c ? watchService.watchIncidents(c) : EMPTY)));

    concernService.getActiveId().pipe(
        switchMap(concern => concern ? endpoint.getAlarmTemplates({concern}) : of({})),
    ).subscribe(templates => this.alarmTemplates = templates);
  }

  getAlarmTemplates(): { [key: string]: string } {
    return this.alarmTemplates;
  }

  createIncident(body: IncidentCreateDto): Observable<number> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.createIncident({concern, body}).pipe(map(i => i.id))
    );
  }

  updateIncident(incident: number, body: IncidentUpdateDto): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.updateIncident({concern, incident, body})
    );
  }

  sendAlarm(incident: number, body: SendAlarmDto): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.sendAlarm({concern, incident, body})
    );
  }
}
