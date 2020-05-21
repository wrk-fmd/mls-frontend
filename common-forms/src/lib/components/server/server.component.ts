import {Component, Input} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from '@angular/forms';
import {TrackingFormControl} from '../../forms';

@Component({
  selector: 'mls-form-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class FormServerComponent {

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  get show(): boolean {
    return this.control instanceof TrackingFormControl && this.control.serverChange;
  }

  get value(): any {
    return this.control instanceof TrackingFormControl ? this.control.serverValue : null;
  }

  setServerValue() {
    if (this.control instanceof TrackingFormControl) {
      this.control.setValue(this.control.serverValue);
    }
  }
}
