import {Pipe, PipeTransform} from '@angular/core';
import {StaffMemberBriefDto} from 'mls-coceso-api';
import {StaffHelper} from '../helpers/staff.helper';

@Pipe({
  name: 'cocesoStaffName'
})
export class StaffNamePipe implements PipeTransform {

  constructor(private readonly helper: StaffHelper) {
  }

  transform(member: StaffMemberBriefDto): string {
    return this.helper.getName(member);
  }
}
