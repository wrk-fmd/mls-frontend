/* tslint:disable */
import { PointDto } from './point-dto';
export interface IncidentCreateDto {
  ao?: PointDto;
  blue?: boolean;
  bo?: PointDto;
  caller?: string;
  casusNr?: string;
  closed?: 'Active' | 'Closed' | 'Cancelled' | 'NoPatient' | 'NoTransport';
  info?: string;
  priority?: boolean;
  section?: string;
  type?: 'Standby' | 'ToHome' | 'Position' | 'Task' | 'Transport';
}
