/* tslint:disable */
import { ContactDto } from './contact-dto';
export interface StaffMemberDto {
  contacts?: Array<ContactDto>;
  firstname?: string;
  info?: string;
  lastname?: string;
  personnelId?: Array<number>;
}
