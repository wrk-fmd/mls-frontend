/* tslint:disable */
/* eslint-disable */
import { ContactDto } from './contact-dto';
import { PointDto } from './point-dto';
import { StaffMemberDto } from './staff-member-dto';
import { TaskDto } from './task-dto';
import { UnitStateDto } from './unit-state-dto';
import { UnitTypeDto } from './unit-type-dto';
export interface UnitDto {
  call: string;
  concern: number;
  contacts: Array<ContactDto>;
  crew: Array<StaffMemberDto>;
  home: PointDto;
  id: number;
  incidents: Array<TaskDto>;
  info: string;
  portable: boolean;
  position: PointDto;
  section: null | string;
  state: UnitStateDto;
  types: Array<UnitTypeDto>;
}
