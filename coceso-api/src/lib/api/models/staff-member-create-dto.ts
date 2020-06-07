/* tslint:disable */
import { ContactDto } from './contact-dto';
export interface StaffMemberCreateDto {
  contacts?: Array<ContactDto>;
  firstname?: string;
  info?: string;
  lastname?: string;
  personnelId?: Array<number>;
}
