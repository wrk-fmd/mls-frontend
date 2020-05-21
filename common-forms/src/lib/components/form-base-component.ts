import {Input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

export abstract class FormBaseComponent<T extends AbstractControl> {

  @Input()
  control: T;

  @Input()
  label: string;

  @Input()
  required = false;

  @Input()
  set disabled(disabled: boolean) {
    disabled ? this.control.disable() : this.control.enable();
  }
}
