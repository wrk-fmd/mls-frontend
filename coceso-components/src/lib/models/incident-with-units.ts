import {IncidentDto, TaskDto, UnitDto} from 'mls-coceso-api';

export interface IncidentWithUnits extends IncidentDto {
  units: TaskWithUnit[];
}

export interface TaskWithUnit extends TaskDto {
  unitData?: UnitDto;
}
