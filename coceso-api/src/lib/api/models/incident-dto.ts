/* tslint:disable */
import { PointDto } from './point-dto';
import { TaskDto } from './task-dto';
export interface IncidentDto {
  ao?: PointDto;
  arrival?: string;
  blue?: boolean;
  bo?: PointDto;
  caller?: string;
  casusNr?: string;
  concern?: number;
  created?: string;
  ended?: string;
  id?: number;
  info?: string;
  patient?: number;
  priority?: boolean;
  section?: string;
  state?: 'Open' | 'Demand' | 'InProgress' | 'Done';
  stateChange?: string;
  type?: 'HoldPosition' | 'Standby' | 'Relocation' | 'ToHome' | 'Task' | 'Transport';
  units?: Array<TaskDto>;
}
