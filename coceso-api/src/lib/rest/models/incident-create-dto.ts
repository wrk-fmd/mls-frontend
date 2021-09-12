/* tslint:disable */
/* eslint-disable */
import { IncidentClosedReasonDto } from './incident-closed-reason-dto';
import { IncidentTypeDto } from './incident-type-dto';
import { PointDto } from './point-dto';
export interface IncidentCreateDto {
  ao?: PointDto;
  blue?: boolean;
  bo?: PointDto;
  caller?: string;
  casusNr?: string;
  closed?: IncidentClosedReasonDto;
  info?: string;
  priority?: boolean;
  section?: string;
  type: IncidentTypeDto;
}
