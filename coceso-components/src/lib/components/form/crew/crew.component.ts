import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';

import {StaffEndpointService, StaffMemberDto} from 'mls-coceso-api';
import {AddRemoveContainer, ChangedItems} from 'mls-common-forms';

import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {StaffHelper} from '../../../helpers';

@Component({
  selector: 'coceso-form-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class FormCrewComponent {

  private readonly data = new AddRemoveContainer<number, StaffMemberDto>(m => m.id);

  @Output()
  readonly changed = new EventEmitter<ChangedItems<StaffMemberDto>>();

  @ViewChild('input')
  input: ElementRef<HTMLInputElement>;

  form: FormControl;
  staff: Observable<StaffMemberDto[]>;

  constructor(private readonly staffService: StaffEndpointService, private readonly staffHelper: StaffHelper, fb: FormBuilder) {
    this.form = fb.control('');
    this.staff = this.form.valueChanges.pipe(switchMap(filter => this.loadStaff(filter)));
  }

  get crew(): StaffMemberDto[] {
    return this.data.values;
  }

  @Input()
  set crew(values: StaffMemberDto[]) {
    this.data.values = values;
    this.changed.emit(this.data);
  }

  private loadStaff(filter: string): Observable<StaffMemberDto[]> {
    return filter && filter.length >= 3
        ? this.staffService.getAllStaff({filter}).pipe(map(p => p.content || []))
        : of([]);
  }

  getName(member: StaffMemberDto): string {
    return this.staffHelper.getName(member);
  }

  addMember(member: StaffMemberDto) {
    if (this.data.add(member)) {
      this.changed.emit(this.data);
    }

    this.form.setValue('');
    this.input.nativeElement.value = '';
  }

  removeMember(member: StaffMemberDto) {
    if (this.data.remove(member)) {
      this.changed.emit(this.data);
    }
  }
}
