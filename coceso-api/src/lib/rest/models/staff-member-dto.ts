/* tslint:disable */
/* eslint-disable */
import { ContactDto } from './contact-dto';
export interface StaffMemberDto {
  contacts: Array<ContactDto>;
  firstname: string;
  id: number;
  info: string;
  lastname: string;
  personnelId: Array<number>;
}
