import {AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';

export class TrackingFormControl extends FormControl {

  private _serverValue: any;

  constructor(formState: any,
              validatorOrOpts: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(formState, validatorOrOpts, asyncValidator);
    this._serverValue = this.value;
  }

  get serverValue(): any {
    return this._serverValue;
  }

  setServerValue(value: any, keepExisting?: boolean): void {
    if (this.valueEquals(value, this._serverValue)) {
      // No change, do nothing
      return;
    }

    if (!keepExisting || this.valueEquals(this.value, this._serverValue)) {
      // Overwrite current value if it should not be kept or has not been changed by the user
      super.setValue(value);
    }
    this._serverValue = value;
    this.setDirtyState();
  }

  setValue(value: any,
           options?: { onlySelf?: boolean; emitEvent?: boolean; emitModelToViewChange?: boolean; emitViewToModelChange?: boolean }): void {
    super.setValue(value, options);
    this.setDirtyState(options);
  }

  private setDirtyState(opts?: { onlySelf?: boolean }): void {
    if (this.valueEquals(this.value, this._serverValue)) {
      super.markAsPristine(opts);
    } else {
      super.markAsDirty(opts);
    }
  }

  private valueEquals(a: any, b: any) {
    if (a === b) {
      return true;
    }

    if (!(a instanceof Array) || !(b instanceof Array)) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    for (const item of a) {
      if (!b.includes(item)) {
        return false;
      }
    }

    return true;
  }
}
