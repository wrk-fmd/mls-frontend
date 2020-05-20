import {Injectable, OnDestroy} from '@angular/core';

import {ContainerCreateDto, ContainerDto, ContainerEndpointService, ContainerUpdateDto} from 'mls-coceso-api';
import {DataService} from 'mls-common-data';

import {Observable, of, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {CocesoWatchService} from './coceso.watch.service';
import {ConcernDataService} from './concern.data.service';

@Injectable()
export class ContainerDataService extends DataService<ContainerDto> implements OnDestroy {

  private readonly concernSubscription: Subscription;

  constructor(private readonly concernService: ConcernDataService, private readonly endpoint: ContainerEndpointService,
              private readonly watchService: CocesoWatchService) {
    super();
    this.concernSubscription = concernService.getActiveId().subscribe(concern => this.subscribeConcern(concern));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.concernSubscription.unsubscribe();
  }

  getRoot(): Observable<ContainerDto> {
    return this.getById(null);
  }

  /**
   * Get a container by id, filtering out empty containers
   * @param id The container id
   */
  getCompact(id: number): Observable<ContainerDto> {
    return this.getById(id).pipe(switchMap(c => {
      if (!c) {
        // No container loaded, display nothing
        return of(null);
      }

      if (c.units && c.units.length) {
        // Container has some unassigned units, display them
        return of(c);
      }

      if (!c.children || !c.children.length) {
        // No children, display nothing
        return of(null);
      }

      if (c.children.length === 1) {
        // Exactly one child container, display it directly
        return this.getCompact(c.children[0]);
      }

      // Display the children of root
      return of(c);
    }));
  }

  createContainer(data: ContainerCreateDto): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.createContainer({concern, data})
    );
  }

  updateContainer(container: number, data: ContainerUpdateDto): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.updateContainer({concern, container, data})
    );
  }

  deleteContainer(container: number): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.deleteContainer({concern, container})
    );
  }

  updateUnit(container: number, unit: number, index: number): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.updateContainerUnit({concern, container, unit, data: {index}})
    );
  }

  removeUnit(container: number, unit: number): Observable<null> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.removeContainerUnit({concern, container, unit})
    );
  }

  // updateIncident(incident: number, data: IncidentUpdateDto): Observable<null> {
  //   return this.concernService.runWithConcern(
  //       concern => this.endpoint.updateIncident({concern, incident, data})
  //   );
  // }

  private subscribeConcern(concern: number) {
    if (concern) {
      this.subscribe(this.watchService.watchContainers(concern));
    } else {
      this.unsubscribe();
    }
  }
}
