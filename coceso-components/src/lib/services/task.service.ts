import {Injectable} from '@angular/core';

import {TaskEndpointService, TaskStateDto} from 'mls-coceso-api';

import {Observable} from 'rxjs';

import {ConcernDataService} from './concern.data.service';

@Injectable()
export class TaskService {

  constructor(private readonly concernService: ConcernDataService, private readonly endpoint: TaskEndpointService) {
  }

  assign(incident: number, unit: number): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.assign({concern, incident, unit})
    );
  }

  setState(incident: number, unit: number, state: TaskStateDto): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.updateState({concern, incident, unit, data: {state}})
    );
  }
}
