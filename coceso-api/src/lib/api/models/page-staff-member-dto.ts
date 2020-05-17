/* tslint:disable */
import { StaffMemberDto } from './staff-member-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageStaffMemberDto {
  content?: Array<StaffMemberDto>;
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
