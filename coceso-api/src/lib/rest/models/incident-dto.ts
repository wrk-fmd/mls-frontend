/* eslint-disable */
import { PointDto } from './point-dto';
import { TaskDto } from './task-dto';
export interface IncidentDto {
  ao?: PointDto;
  arrival?: number;
  blue?: boolean;
  bo?: PointDto;
  caller?: string;
  casusNr?: string;
  closed?: 'Active' | 'Closed' | 'Cancelled' | 'NoPatient' | 'NoTransport';
  concern?: number;
  created?: number;
  ended?: number;
  id?: number;
  info?: string;
  patient?: number;
  priority?: boolean;
  section?: string;
  stateChange?: number;
  type?: 'Standby' | 'ToHome' | 'Position' | 'Task' | 'Transport';
  units?: Array<TaskDto>;
}
