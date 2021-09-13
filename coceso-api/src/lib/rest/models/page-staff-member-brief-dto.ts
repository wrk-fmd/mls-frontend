/* tslint:disable */
/* eslint-disable */
import { Pageable } from './pageable';
import { Sort } from './sort';
import { StaffMemberBriefDto } from './staff-member-brief-dto';
export interface PageStaffMemberBriefDto {
  content?: Array<StaffMemberBriefDto>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
