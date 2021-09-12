import {Injectable} from '@angular/core';

import {
  CocesoWatchService,
  ContainerCreateDto,
  ContainerDto,
  ContainerEndpointService,
  ContainerUpdateDto,
  UnitStateDto
} from 'mls-coceso-api';
import {DataService} from 'mls-common-data';

import {combineLatest, EMPTY, Observable} from 'rxjs';
import {auditTime, map, shareReplay, switchMap} from 'rxjs/operators';
import {UnitHelper} from '../helpers/unit.helper';

import {ContainerWithDependencies, UnitWithIncidents} from '../models';
import {ConcernDataService} from './concern.data.service';
import {TaskDataService} from './task.data.service';

@Injectable()
export class ContainerDataService extends DataService<ContainerDto> {

  constructor(private readonly concernService: ConcernDataService, private readonly endpoint: ContainerEndpointService,
              private readonly taskService: TaskDataService, private readonly unitHelper: UnitHelper,
              watchService: CocesoWatchService) {
    super(concernService.getActiveId().pipe(switchMap(c => c ? watchService.watchContainers(c) : EMPTY)));
  }

  getRoot(): Observable<ContainerDto> {
    return this.getById(null);
  }

  getRootWithDependencies(): Observable<ContainerWithDependencies> {
    return combineLatest([this.getData(), this.taskService.getUnits()]).pipe(
        auditTime(50),
        map(([containers, units]) => this.buildHierarchyTree(containers, units)),
        shareReplay(1)
    );
  }

  private buildHierarchyTree(containers: Map<number, ContainerDto>, units: UnitWithIncidents[]): ContainerWithDependencies {
    if (!containers || !units) {
      return null;
    }

    // Create a dictionary of units keyed by id to make access faster
    const unitDictionary = new Map(units.map(u => [u.id, u]));
    return this.getCompact(null, containers, unitDictionary);
  }

  /**
   * Get a container with its dependencies by id, filtering out empty containers
   * @param id The container id
   * @param containers All available containers
   * @param units All available units with their dependencies
   */
  private getCompact(id: number, containers: Map<number, ContainerDto>, units: Map<number, UnitWithIncidents>): ContainerWithDependencies {
    const container = containers.get(id);
    if (!container) {
      return null;
    }

    const unitsData = container.units ? container.units.map(u => units.get(u)).filter(u => !!u) : [];
    const childrenData = container.children ? container.children.map(c => this.getCompact(c, containers, units)).filter(c => !!c) : [];

    if (!unitsData.length && childrenData.length <= 1) {
      // No units and at most one child: Skip the container, use the (possibly undefined) child directly
      return childrenData[0];
    }

    const totalUnits = unitsData.length
        + childrenData.map(c => c.totalUnits).reduce((a, b) => a + b, 0);
    const availableUnits = unitsData.filter(u => this.unitHelper.isAvailable(u) || (!u.portable && u.state === UnitStateDto.Ready)).length
        + childrenData.map(c => c.availableUnits).reduce((a, b) => a + b, 0);

    return {
      ...container, totalUnits, availableUnits,
      childrenData: childrenData.length ? childrenData : null,
      unitsData: unitsData.length ? unitsData : null
    };
  }

  createContainer(body: ContainerCreateDto): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.createContainer({concern, body})
    );
  }

  updateContainer(container: number, body: ContainerUpdateDto): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.updateContainer({concern, container, body})
    );
  }

  deleteContainer(container: number): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.deleteContainer({concern, container})
    );
  }

  updateUnit(container: number, unit: number, index: number): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.updateContainerUnit({concern, container, unit, body: {index}})
    );
  }

  removeUnit(container: number, unit: number): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.removeContainerUnit({concern, container, unit})
    );
  }
}
