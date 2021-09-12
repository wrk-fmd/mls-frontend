/* tslint:disable */
/* eslint-disable */
import { ContactDto } from './contact-dto';
import { PointDto } from './point-dto';
import { UnitStateDto } from './unit-state-dto';
import { UnitTypeDto } from './unit-type-dto';
export interface UnitUpdateDto {
  call?: string;
  contacts?: Array<ContactDto>;
  home?: PointDto;
  info?: string;
  portable?: boolean;
  position?: PointDto;
  section?: string;
  state?: UnitStateDto;
  types?: Array<UnitTypeDto>;
}
