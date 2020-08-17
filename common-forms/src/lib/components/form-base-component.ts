import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  template: ''
})
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
