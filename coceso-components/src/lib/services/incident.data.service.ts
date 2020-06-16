import {Injectable} from '@angular/core';

import {CocesoWatchService, IncidentCreateDto, IncidentDto, IncidentEndpointService, IncidentUpdateDto, SendAlarmDto} from 'mls-coceso-api';
import {DataService} from 'mls-common-data';

import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ConcernDataService} from './concern.data.service';

@Injectable()
export class IncidentDataService extends DataService<IncidentDto> {

  private alarmTemplates: { [key: string]: string };

  constructor(private readonly concernService: ConcernDataService, private readonly endpoint: IncidentEndpointService,
              private readonly watchService: CocesoWatchService) {
    super(concernService.getActiveId().pipe(switchMap(c => c ? watchService.watchIncidents(c) : of())));

    concernService.getActiveId().pipe(
        switchMap(c => c ? endpoint.getAlarmTemplates(c) : of({})),
    ).subscribe(templates => this.alarmTemplates = templates);
  }

  getAlarmTemplates(): { [key: string]: string } {
    return this.alarmTemplates;
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

  sendAlarm(incident: number, data: SendAlarmDto): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.sendAlarm({concern, incident, data})
    );
  }
}
