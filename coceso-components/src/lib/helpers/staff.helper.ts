import {Injectable} from '@angular/core';
import {StaffMemberDto} from 'mls-coceso-api';

@Injectable()
export class StaffHelper {

  getName(member: StaffMemberDto): string {
    let name = `${member.lastname} ${member.firstname}`;
    if (member.personnelId.length) {
      name = `${name} (${member.personnelId.join(', ')})`;
    }
    return name.trim();
  }
}
