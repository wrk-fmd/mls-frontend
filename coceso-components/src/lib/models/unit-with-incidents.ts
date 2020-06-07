import {IncidentDto, TaskDto, UnitDto} from 'mls-coceso-api';

export interface UnitWithIncidents extends UnitDto {
  incidents: TaskWithIncident[];
}

export interface TaskWithIncident extends TaskDto {
  incidentData?: IncidentDto;
}
