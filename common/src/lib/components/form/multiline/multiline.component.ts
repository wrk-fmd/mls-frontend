import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormBaseComponent} from '../form-base-component';

@Component({
  selector: 'mls-form-multiline',
  templateUrl: './multiline.component.html'
})
export class FormMultilineComponent extends FormBaseComponent<FormControl> {

  @Input()
  rows = 3;
}
