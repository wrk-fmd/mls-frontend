/* tslint:disable */
/* eslint-disable */
import { ContactDto } from './contact-dto';
export interface StaffMemberUpdateDto {
  contacts?: Array<ContactDto>;
  firstname?: string;
  info?: string;
  lastname?: string;
  personnelId?: Array<number>;
}
