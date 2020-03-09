import {AbstractControlOptions, AsyncValidatorFn, FormBuilder, ValidatorFn} from '@angular/forms';
import {TrackingFormControl} from './tracking-form-control';
import { Injectable } from "@angular/core";

@Injectable()
export class TrackingFormBuilder extends FormBuilder {

  control(formState: any,
          validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
          asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): TrackingFormControl {
    return new TrackingFormControl(formState, validatorOrOpts, asyncValidator);
  }
}
