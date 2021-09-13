import {Injectable} from '@angular/core';
import {StaffMemberBriefDto} from 'mls-coceso-api';

@Injectable()
export class StaffHelper {

  formatPersonnelId(member: StaffMemberBriefDto): string {
    return member.personnelId.sort().join(', ');
  }

  getName(member: StaffMemberBriefDto): string {
    let name = `${member.lastname} ${member.firstname}`;
    if (member.personnelId.length) {
      name = `${name} (${this.formatPersonnelId(member)})`;
    }
    return name.trim();
  }
}
