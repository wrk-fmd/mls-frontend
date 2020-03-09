/* tslint:disable */
import { PointDto } from './point-dto';
export interface IncidentCreateDto {
  ao?: PointDto;
  blue?: boolean;
  bo?: PointDto;
  caller?: string;
  casusNr?: string;
  info?: string;
  priority?: boolean;
  section?: string;
  state?: 'Open' | 'Demand' | 'InProgress' | 'Done';
  type?: 'HoldPosition' | 'Standby' | 'Relocation' | 'ToHome' | 'Task' | 'Transport';
}
