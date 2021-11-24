import {Injectable} from '@angular/core';

import {IncidentDto, IncidentTypeDto, TaskEndpointService, TaskStateDto, UnitDto} from 'mls-coceso-api';
import {ListOptions} from 'mls-common-data';

import {combineLatest, Observable, of} from 'rxjs';
import {auditTime, map, shareReplay} from 'rxjs/operators';

import {IncidentWithUnits, UnitWithIncidents} from '../models';
import {ConcernDataService} from './concern.data.service';
import {IncidentDataService} from './incident.data.service';
import {UnitDataService} from './unit.data.service';

@Injectable()
export class TaskDataService {

  private readonly combined: Observable<CombinedData>;
  private readonly filtered: Observable<FilteredData>;

  constructor(private readonly concernService: ConcernDataService, private readonly endpoint: TaskEndpointService,
              incidentService: IncidentDataService, unitService: UnitDataService) {
    this.combined = combineLatest([incidentService.getData(), unitService.getData()]).pipe(
        auditTime(50),
        map(([incidents, units]) => this.buildCombined(incidents, units)),
        shareReplay(1)
    );

    this.filtered = combineLatest([this.combined, this.concernService.getActiveSection()]).pipe(
        map(([combined, section]) => this.buildFiltered(combined, section)),
        shareReplay(1)
    );
  }

  private buildCombined(incidents: Map<number, IncidentDto>, units: Map<number, UnitDto>): CombinedData {
    return {
      incidents: new Map([...incidents.values()].map(i => [i.id, this.buildIncident(i, units)])),
      units: new Map([...units.values()].map(i => [i.id, this.buildUnit(i, incidents)]))
    };
  }

  private buildIncident(incident: IncidentDto, units: Map<number, UnitDto>): IncidentWithUnits {
    return {
      ...incident,
      units: incident.units ? incident.units.map(task => ({
        ...task,
        unitData: units.get(task.unit)
      })) : []
    };
  }

  private buildUnit(unit: UnitDto, incidents: Map<number, IncidentDto>): UnitWithIncidents {
    return {
      ...unit,
      incidents: unit.incidents ? unit.incidents.map(task => ({
        ...task,
        incidentData: incidents.get(task.incident)
      })) : []
    };
  }

  private buildFiltered(data: CombinedData, section: string | null): FilteredData {
    const incidents = [...data.incidents.values()];
    const units = [...data.units.values()];
    return section ? {
      incidents: incidents.filter(i => !i.section || i.section === section),
      units: units.filter(u => !u.section || u.section === section)
    } : {incidents, units};
  }

  getIncident(id?: number): Observable<IncidentWithUnits | undefined> {
    return id ? this.combined.pipe(map(c => c.incidents.get(id))) : of(undefined);
  }

  getIncidents(options?: ListOptions<IncidentWithUnits>, addDefaultSort = true): Observable<IncidentWithUnits[]> {
    options = options || new ListOptions();
    options.addFilters(
        i => i.type === IncidentTypeDto.Task || i.type === IncidentTypeDto.Transport || i.type === IncidentTypeDto.Position
    );

    if (addDefaultSort) {
      options.addSort(
          (a, b) => +b.priority - +a.priority,
          (a, b) => +b.blue - +a.blue,
          (a, b) => b.id - a.id
      );
    }

    return this.filtered.pipe(map(data => options!.apply(data.incidents)));
  }

  getUnit(id?: number): Observable<UnitWithIncidents | undefined> {
    return id ? this.combined.pipe(map(c => c.units.get(id))) : of(undefined);
  }

  getAllUnits(): Observable<Map<number, UnitWithIncidents>> {
    return this.combined.pipe(map(data => data.units));
  }

  getUnits(options?: ListOptions<UnitWithIncidents>, addDefaultSort = true): Observable<UnitWithIncidents[]> {
    options = options || new ListOptions();

    if (addDefaultSort) {
      options.addSort(
          (a, b) => a.call.localeCompare(b.call),
          (a, b) => b.id - a.id
      );
    }

    return this.filtered.pipe(map(data => options!.apply(data.units)));
  }

  assign(incident: number, unit: number): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.assign({concern, incident, unit})
    );
  }

  setState(incident: number, unit: number, state: TaskStateDto): Observable<void> {
    return this.concernService.runWithConcern(
        concern => this.endpoint.updateState({concern, incident, unit, body: {state}})
    );
  }
}

interface CombinedData {
  incidents: Map<number, IncidentWithUnits>;
  units: Map<number, UnitWithIncidents>;
}

interface FilteredData {
  incidents: IncidentWithUnits[];
  units: UnitWithIncidents[];
}
