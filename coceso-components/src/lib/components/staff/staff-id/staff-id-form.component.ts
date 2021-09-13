import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {AddRemoveContainer, ChangedItems} from 'mls-common-forms';

@Component({
  selector: 'coceso-staff-id-form',
  templateUrl: './staff-id-form.component.html'
})
export class StaffIdFormComponent {

  private readonly data = new AddRemoveContainer<string, number>(id => id.toString());

  @Output()
  readonly changed = new EventEmitter<ChangedItems<number>>();

  control: FormControl;

  constructor(fb: FormBuilder) {
    this.control = fb.control(null);
  }

  get ids(): number[] {
    return this.data.values;
  }

  @Input()
  set ids(values: number[]) {
    this.data.values = values;
    this.changed.emit(this.data);
  }

  addId(event: MatChipInputEvent) {
    if (!this.control.valid || !event.value) {
      return;
    }

    if (this.data.add(+event.value)) {
      this.changed.emit(this.data);
    }

    this.control.reset(null);
    event.input.value = '';
  }

  removeId(id: number) {
    if (this.data.remove(id)) {
      this.changed.emit(this.data);
    }
  }
}
