import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IncidentClosedReasonDto, UnitTypeDto} from 'mls-coceso-api';
import {FormBaseComponent} from 'mls-common';

@Component({
  selector: 'coceso-form-incident-close',
  templateUrl: './incident-close.component.html'
})
export class FormIncidentCloseComponent extends FormBaseComponent<FormControl> {

  readonly reasons = Object.values(IncidentClosedReasonDto);
}
