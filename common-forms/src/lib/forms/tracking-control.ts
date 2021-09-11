import {AbstractControlOptions, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';

interface TrackingControl {
  setServerValue(value: any): void;
}

function isTrackingControl(control: any): control is TrackingControl {
  return control && (control as any).setServerValue !== undefined;
}

export class TrackingFormControl extends FormControl implements TrackingControl {

  private _serverValue: any;
  private _serverChange = false;

  constructor(formState: any,
              validatorOrOpts: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] | null,
              private readonly keepExisting = false) {
    super(formState, validatorOrOpts, asyncValidator);
    this._serverValue = this.value;
  }

  get serverValue(): any {
    return this._serverValue;
  }

  get serverChange(): boolean {
    return this._serverChange;
  }

  setServerValue(value: any): void {
    if (this.valueEquals(value, this._serverValue)) {
      // No change, do nothing
      return;
    }

    if (!this.keepExisting || this.valueEquals(this.value, this._serverValue)) {
      // Overwrite current value if it should not be kept or has not been changed by the user
      super.setValue(value);
      this._serverChange = false;
    } else {
      this._serverChange = true;
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
      this._serverChange = false;
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

export class TrackingFormGroup extends FormGroup implements TrackingControl {
  setServerValue(value: any): void {
    Object.entries(value).forEach(([name, val]) => this.setControlServerValue(name, val));
  }

  private setControlServerValue(name: string, value: any) {
    if (value === undefined) {
      return;
    }

    const control = this.controls[name];
    if (isTrackingControl(control)) {
      control.setServerValue(value);
    } else if (control) {
      control.setValue(value);
    }
  }

  control(name: string): FormControl {
    return <FormControl>this.controls[name];
  }
}

export class TrackingFormArray extends FormArray implements TrackingControl {
  setServerValue(value: any[]): void {
    value.forEach((val, index) => this.setControlServerValue(index, val));
  }

  private setControlServerValue(index: number, value: any) {
    if (value === undefined) {
      return;
    }

    const control = this.at(index);
    if (isTrackingControl(control)) {
      control.setServerValue(value);
    } else if (control) {
      control.setValue(value);
    }
  }
}
