import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormBaseComponent} from 'mls-common-forms';

@Component({
  selector: 'coceso-form-point',
  templateUrl: './point.component.html'
})
export class FormPointComponent extends FormBaseComponent<FormControl> {
}
