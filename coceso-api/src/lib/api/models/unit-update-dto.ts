/* tslint:disable */
import { ContactDto } from './contact-dto';
import { PointDto } from './point-dto';
export interface UnitUpdateDto {
  call?: string;
  contacts?: Array<ContactDto>;
  home?: PointDto;
  info?: string;
  portable?: boolean;
  position?: PointDto;
  section?: string;
  state?: 'OFF_DUTY' | 'READY' | 'NOT_READY';
  transportVehicle?: boolean;
  type?: 'Portable' | 'Triage' | 'Treatment' | 'Postprocessing' | 'Info' | 'Officer';
  withDoc?: boolean;
}
