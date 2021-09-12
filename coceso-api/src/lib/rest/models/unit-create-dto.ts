/* tslint:disable */
/* eslint-disable */
import { ContactDto } from './contact-dto';
import { PointDto } from './point-dto';
import { UnitTypeDto } from './unit-type-dto';
export interface UnitCreateDto {
  call: string;
  contacts?: Array<ContactDto>;
  home?: PointDto;
  info?: string;
  portable?: boolean;
  section?: string;
  types?: Array<UnitTypeDto>;
}
