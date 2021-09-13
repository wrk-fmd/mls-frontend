import {Injectable} from '@angular/core';

import {
  Pageable,
  PageStaffMemberBriefDto,
  StaffEndpointService,
  StaffMemberCreateDto,
  StaffMemberDto,
  StaffMemberUpdateDto
} from 'mls-coceso-api';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class StaffDataService {

  constructor(private readonly endpoint: StaffEndpointService) {
  }

  getAll(pageable?: Pageable, filter?: string): Observable<PageStaffMemberBriefDto> {
    return this.endpoint.getAllStaff({...pageable, filter});
  }

  getById(id?: number): Observable<StaffMemberDto | undefined> {
    return id ? this.endpoint.getStaffMember({staffMember: id}) : of(undefined);
  }

  createStaffMember(body: StaffMemberCreateDto): Observable<number> {
    return this.endpoint.createStaffMember({body}).pipe(map(i => i.id));
  }

  updateStaffMember(staffMember: number, body: StaffMemberUpdateDto): Observable<void> {
    return this.endpoint.updateStaffMember({staffMember, body});
  }
}
