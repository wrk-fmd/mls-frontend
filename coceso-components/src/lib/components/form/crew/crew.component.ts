import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';

import {StaffMemberBriefDto} from 'mls-coceso-api';
import {AddRemoveContainer, ChangedItems} from 'mls-common-forms';

import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {StaffHelper} from '../../../helpers';
import {StaffDataService} from '../../../services/staff.data.service';

@Component({
  selector: 'coceso-form-crew',
  templateUrl: './crew.component.html'
})
export class FormCrewComponent {

  private readonly data = new AddRemoveContainer<number, StaffMemberBriefDto>(m => m.id);

  @Output()
  readonly changed = new EventEmitter<ChangedItems<StaffMemberBriefDto>>();

  @ViewChild('input')
  input?: ElementRef<HTMLInputElement>;

  form: FormControl;
  staff: Observable<StaffMemberBriefDto[]>;

  constructor(private readonly staffService: StaffDataService, private readonly staffHelper: StaffHelper, fb: FormBuilder) {
    this.form = fb.control('');
    this.staff = this.form.valueChanges.pipe(switchMap(filter => this.loadStaff(filter)));
  }

  get crew(): StaffMemberBriefDto[] {
    return this.data.values;
  }

  @Input()
  set crew(values: StaffMemberBriefDto[]) {
    this.data.values = values;
    this.changed.emit(this.data);
  }

  private loadStaff(filter: string): Observable<StaffMemberBriefDto[]> {
    return filter && filter.length >= 3
        ? this.staffService.getAll({sort: ['lastname,asc', 'firstname,asc']}, filter).pipe(map(p => p.content || []))
        : of([]);
  }

  addMember(member: StaffMemberBriefDto) {
    if (this.data.add(member)) {
      this.changed.emit(this.data);
    }

    this.form.setValue('');
    this.form.markAsPristine();
    if (this.input) {
      this.input.nativeElement.value = '';
    }
  }

  removeMember(member: StaffMemberBriefDto) {
    if (this.data.remove(member)) {
      this.changed.emit(this.data);
    }
  }
}
