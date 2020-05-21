import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormBaseComponent} from '../form-base-component';

@Component({
  selector: 'mls-form-text',
  templateUrl: './text.component.html'
})
export class FormTextComponent extends FormBaseComponent<FormControl> {

  @Input()
  type = 'text';

  @Input()
  autocomplete: string;

  @Input()
  min: number;

  @Input()
  max: number;
}
