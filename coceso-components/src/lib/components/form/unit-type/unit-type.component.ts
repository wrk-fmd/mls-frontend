import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UnitTypeDto} from 'mls-coceso-api';
import {FormBaseComponent} from 'mls-common-forms';

@Component({
  selector: 'coceso-form-unit-type',
  templateUrl: './unit-type.component.html'
})
export class FormUnitTypeComponent extends FormBaseComponent<FormControl> {

  readonly types = Object.values(UnitTypeDto);
}
