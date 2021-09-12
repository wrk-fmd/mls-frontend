import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';

import {ContactDto} from 'mls-coceso-api';
import {AddRemoveContainer, ChangedItems} from 'mls-common-forms';

import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'coceso-form-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class FormContactsComponent implements OnDestroy {

  readonly types = ['phone', 'kenwood', 'tetra'];

  private readonly data = new AddRemoveContainer<string, ContactDto>(c => c.type + c.data);

  @Output()
  readonly changed = new EventEmitter<ChangedItems<ContactDto>>();

  private readonly typeSubscription: Subscription;
  private type?: string;
  form: FormGroup;

  inputType: string = 'text';

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      data: ['', (control: AbstractControl) => this.validateData(control)],
      type: [null]
    });

    this.typeSubscription = this.form.controls.type.valueChanges.subscribe(type => this.setType(type));
  }

  ngOnDestroy() {
    this.typeSubscription.unsubscribe();
  }

  get contacts(): ContactDto[] {
    return this.data.values;
  }

  @Input()
  set contacts(values: ContactDto[]) {
    this.data.values = values;
    this.changed.emit(this.data);
  }

  private buildInputType(type: string): string {
    switch (type) {
      case 'phone':
        return 'tel';
      case 'kenwood':
      case 'tetra':
        return 'number';
      default:
        return 'text';
    }
  }

  private setType(type: string) {
    this.type = type;
    this.inputType = this.buildInputType(type);
    this.form.controls.data.updateValueAndValidity();
  }

  validateData(control: AbstractControl): ValidationErrors | null {
    if (!this.type) {
      return {'contact.type': true};
    }

    if (!control.value) {
      return null;
    }

    switch (this.type) {
      case 'phone':
        return validatePhone(control.value);
      case 'kenwood':
        return validateLength(control.value, 7);
      case 'tetra':
        return validateLength(control.value, 8);
    }

    return null;
  }

  addContact(event: MatChipInputEvent) {
    if (!this.form.valid || !event.value || !this.type) {
      return;
    }

    if (this.data.add({data: event.value, type: this.type})) {
      this.changed.emit(this.data);
    }

    this.form.reset({data: '', type: this.type});
    event.input.value = '';
  }

  removeContact(contact: ContactDto) {
    if (this.data.remove(contact)) {
      this.changed.emit(this.data);
    }
  }
}

function validatePhone(value: string): ValidationErrors | null {
  const errors: ValidationErrors = {};

  // Must start with country prefix
  if (!value.match(/^\+[1-9]/)) {
    errors['phone.prefix'] = true;
  }

  // Ignore all kinds of delimiters
  value = value.replace(/[ /.\-]/g, '');
  if (!value.match(/^\+?\d*$/)) {
    errors['phone.numeric'] = true;
  }
  if (value.length < 7) {
    errors.minlength = {requiredLength: 7, actualLength: value.length};
  }

  return errors;
}

function validateLength(value: string, length: number): ValidationErrors | null {
  return value.length !== length
      ? {length: {requiredLength: length, actualLength: value.length}}
      : null;
}
