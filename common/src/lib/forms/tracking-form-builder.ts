import {Injectable} from '@angular/core';
import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormBuilder, ValidatorFn} from '@angular/forms';
import {TrackingFormArray, TrackingFormControl, TrackingFormGroup} from './tracking-control';

@Injectable()
export class TrackingFormBuilder extends FormBuilder {

  control(formState: any,
          validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
          asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
          keepExisting = false): TrackingFormControl {
    return new TrackingFormControl(formState, validatorOrOpts, asyncValidator, keepExisting);
  }

  group(controlsConfig: { [p: string]: any }, options?: AbstractControlOptions): TrackingFormGroup {
    const controls = Object.entries(controlsConfig).reduce((obj, [name, config]) => {
      obj[name] = this.createTrackingControl(config);
      return obj;
    }, {});
    return new TrackingFormGroup(controls, options);
  }

  array(controlsConfig: any[],
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): TrackingFormArray {
    const controls = controlsConfig.map(c => this.createTrackingControl(c));
    return new TrackingFormArray(controls, validatorOrOpts, asyncValidator);
  }

  private createTrackingControl(controlConfig): AbstractControl {
    if (controlConfig instanceof AbstractControl) {
      return controlConfig;
    }

    if (Array.isArray(controlConfig)) {
      const value = controlConfig[0];
      const validator = controlConfig.length > 1 ? controlConfig[1] : null;
      const asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
      const keepExisting = controlConfig.length > 3 ? controlConfig[3] : false;
      return this.control(value, validator, asyncValidator, keepExisting);
    } else {
      return this.control(controlConfig);
    }
  }
}
