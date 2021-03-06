/* tslint:disable */
import { ContactDto } from './contact-dto';
import { PointDto } from './point-dto';
export interface UnitCreateDto {
  call?: string;
  contacts?: Array<ContactDto>;
  home?: PointDto;
  info?: string;
  portable?: boolean;
  section?: string;
  types?: Array<'Portable' | 'Triage' | 'Treatment' | 'Postprocessing' | 'Info' | 'Officer'>;
}
