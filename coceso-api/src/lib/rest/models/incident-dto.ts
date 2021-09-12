/* tslint:disable */
/* eslint-disable */
import { IncidentClosedReasonDto } from './incident-closed-reason-dto';
import { IncidentTypeDto } from './incident-type-dto';
import { PointDto } from './point-dto';
import { TaskDto } from './task-dto';
export interface IncidentDto {
  ao: PointDto;
  arrival: null | number;
  blue: boolean;
  bo: PointDto;
  caller: string;
  casusNr: string;
  closed: IncidentClosedReasonDto;
  concern: number;
  created: number;
  ended: null | number;
  id: number;
  info: string;
  patient: null | number;
  priority: boolean;
  section: null | string;
  stateChange: null | number;
  type: IncidentTypeDto;
  units: Array<TaskDto>;
}
