import {Pipe, PipeTransform} from '@angular/core';
import {StaffMemberBriefDto} from 'mls-coceso-api';
import {StaffHelper} from '../helpers/staff.helper';

@Pipe({
  name: 'cocesoStaffId'
})
export class StaffIdPipe implements PipeTransform {

  constructor(private readonly helper: StaffHelper) {
  }

  transform(member: StaffMemberBriefDto): string {
    return this.helper.formatPersonnelId(member);
  }
}
