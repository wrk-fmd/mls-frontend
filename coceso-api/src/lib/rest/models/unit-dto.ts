/* tslint:disable */
import { ContactDto } from './contact-dto';
import { StaffMemberDto } from './staff-member-dto';
import { PointDto } from './point-dto';
import { TaskDto } from './task-dto';
export interface UnitDto {
  call?: string;
  concern?: number;
  contacts?: Array<ContactDto>;
  crew?: Array<StaffMemberDto>;
  home?: PointDto;
  id?: number;
  incidents?: Array<TaskDto>;
  info?: string;
  portable?: boolean;
  position?: PointDto;
  section?: string;
  state?: 'OFF_DUTY' | 'READY' | 'NOT_READY';
  types?: Array<'Portable' | 'Triage' | 'Treatment' | 'Postprocessing' | 'Info' | 'Officer'>;
}
