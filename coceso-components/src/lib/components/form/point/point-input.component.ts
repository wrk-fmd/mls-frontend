import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, Directive, ElementRef, HostBinding, Input, OnDestroy, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl} from '@angular/forms';
import {_MatAutocompleteTriggerBase} from '@angular/material/autocomplete';
import {MatFormFieldControl} from '@angular/material/form-field';

import {Address, PointDto} from 'mls-coceso-api';

import {Subject} from 'rxjs';

@Component({
  selector: 'coceso-form-point-input',
  templateUrl: 'point-input.component.html',
  styleUrls: ['point-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: FormPointInputComponent}]
})
export class FormPointInputComponent implements ControlValueAccessor, MatFormFieldControl<PointDto>, OnDestroy {
  private static nextId = 0;

  @ViewChild('addressStreet') addressStreetInput?: HTMLInputElement;
  @ViewChild('addressIntersection') addressIntersectionInput?: HTMLInputElement;
  @ViewChild('addressNumber') addressNumberInput?: HTMLInputElement;
  @ViewChild('addressBlock') addressBlockInput?: HTMLInputElement;
  @ViewChild('addressDetails') addressDetailsInput?: HTMLInputElement;
  @ViewChild('addressPostCode') addressPostCodeInput?: HTMLInputElement;
  @ViewChild('addressCity') addressCityInput?: HTMLInputElement;
  @ViewChild('details') detailsInput?: HTMLInputElement;

  form: FormGroup;

  readonly stateChanges = new Subject<void>();

  focused = false;
  touched = false;
  readonly controlType = 'point-input';

  @HostBinding()
  readonly id = `point-input-${FormPointInputComponent.nextId++}`;

  private _onChange = (_: any) => {
  };
  private _onTouched = () => {
  };

  private _value: PointDto | null = null;

  get empty() {
    return !this.form.value.details && !this.isPoi && !this.hasAddress;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder || '';
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  private _placeholder?: string;

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.form.disable() : this.form.enable();
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get value(): PointDto | null {
    let pointNotEmpty = false;
    const value: PointDto = {};
    pointNotEmpty = this.copyIfNotEmpty(this.form.value, value, 'poi') || pointNotEmpty;
    pointNotEmpty = this.copyIfNotEmpty(this.form.value, value, 'details') || pointNotEmpty;

    if (this._value?.coordinates) {
      value.coordinates = this._value.coordinates;
      pointNotEmpty = true;
    }

    let addressNotEmpty = false;
    const address: Address = {};
    addressNotEmpty = this.copyIfNotEmpty(this.form.value.address, address, 'street') || addressNotEmpty;
    addressNotEmpty = this.copyIfNotEmpty(this.form.value.address, address, 'intersection') || addressNotEmpty;
    addressNotEmpty = this.copyIfNotEmpty(this.form.value.address, address, 'number') || addressNotEmpty;
    addressNotEmpty = this.copyIfNotEmpty(this.form.value.address, address, 'block') || addressNotEmpty;
    addressNotEmpty = this.copyIfNotEmpty(this.form.value.address, address, 'details') || addressNotEmpty;
    addressNotEmpty = this.copyIfNotEmpty(this.form.value.address, address, 'city') || addressNotEmpty;

    const postCode = parseInt(this.form.value.address.postCode);
    if (postCode) {
      address.postCode = postCode;
      addressNotEmpty = true;
    }

    if (addressNotEmpty) {
      value.address = address;
      pointNotEmpty = true;
    }

    return pointNotEmpty ? value : null;
  }

  set value(point: PointDto | null) {
    this._value = point;
    console.log(point);

    this.form.setValue({
      poi: point?.poi || null,
      address: {
        street: point?.address?.street || null,
        intersection: point?.address?.intersection || null,
        number: point?.address?.number || null,
        block: point?.address?.block || null,
        details: point?.address?.details || null,
        postCode: point?.address?.postCode?.toString() || null,
        city: point?.address?.city || null,
      },
      details: point?.details || null,
    });

    this.stateChanges.next();

    // Trigger input event so the parent control is updated
    this.onInput();

    // Update the focused element
    //     setTimeout(() => this.autofocus(), 0);
  }

  get errorState(): boolean {
    return this.form.invalid && this.touched;
  }

  get isPoi(): boolean {
    return !!this.form.value.poi;
  }

  get hasAddress(): boolean {
    return !!this.form.value.address.street || !!this.form.value.address.intersection
        || !!this.form.value.address.number || !!this.form.value.address.block || !!this.form.value.address.details
        || !!this.form.value.address.postCode || !!this.form.value.address.city;
  }

  get hasCoordinates(): boolean {
    return !!this._value?.coordinates;
  }

  constructor(fb: FormBuilder, private readonly _focusMonitor: FocusMonitor, private readonly _elementRef: ElementRef<HTMLElement>,
              @Optional() @Self() readonly ngControl: NgControl) {

    this.form = fb.group({
      'poi': [null],
      'address': fb.group({
        'street': [null],
        'intersection': [null],
        'number': [null],
        'block': [null],
        'details': [null],
        'postCode': [null],
        'city': [null],
      }),
      'details': [''],
    })

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn(_: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this._onTouched();
      this.stateChanges.next();
    }
  }

  clearPoi() {
    this.value = {details: this.form.value.details};
    this.onInput();
  }

  ignoreInput() {
    // Do nothing on purpose
    return false;
  }

  autofocus() {
    // TODO This also needs to consider what's currently focused

    let target;

    if (!this.form.value.address.street) {
      target = this.addressStreetInput;
    } else if (!this.form.value.address.number) {
      target = this.addressNumberInput;
    } else if (!this.form.value.address.block) {
      target = this.addressBlockInput;
    } else if (!this.form.value.address.details) {
      target = this.addressDetailsInput;
    } else if (!this.form.value.address.postCode) {
      target = this.addressPostCodeInput;
    } else if (!this.form.value.address.city) {
      target = this.addressCityInput;
    }

    if (!target) {
      target = this.detailsInput;
    }

    if (target) {
      this._focusMonitor.focusVia(target, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
  }

  writeValue(point: PointDto | null): void {
    this.value = point;
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onContainerClick(event: MouseEvent): void {
    // TODO Do we need to do anything here? We could focus the details field, but is it necessary?
  }

  onInput(): void {
    if (this.coordinatesInvalid()) {
      // Update caused the coordinates to be invalid, so delete them
      this._value = null;
    }
    this._onChange(this.value);
  }

  private coordinatesInvalid(): boolean {
    if (!this._value) {
      return false;
    }

    // Check all fields that are considered when loading coordinates
    return this.fieldChanged(this._value.poi, this.form.value.poi)
        || this.fieldChanged(this._value.address?.street, this.form.value.address?.street)
        || this.fieldChanged(this._value.address?.intersection, this.form.value.address?.intersection)
        || this.fieldChanged(this._value.address?.number, this.form.value.address?.number)
        || this.fieldChanged(this._value.address?.block, this.form.value.address?.block)
        || this.fieldChanged(this._value.address?.postCode, parseInt(this.form.value.address?.postCode))
        || this.fieldChanged(this._value.address?.city, this.form.value.address?.city);
  }

  private fieldChanged(a: any, b: any): boolean {
    return !!(a || b) && a !== b;
  }

  private copyIfNotEmpty(source: any, target: any, key: string): boolean {
    const value = source[key]?.trim();
    if (value) {
      target[key] = value;
      return true;
    }
    return false;
  }
}

// This is essentially copied from the regular autocomplete trigger, but we need to apply it to a non-input here
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'coceso-form-point-input[matAutocomplete]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    'class': 'mat-autocomplete-trigger',
    '[attr.autocomplete]': 'autocompleteAttribute',
    '[attr.role]': 'autocompleteDisabled ? null : "combobox"',
    '[attr.aria-autocomplete]': 'autocompleteDisabled ? null : "list"',
    '[attr.aria-activedescendant]': '(panelOpen && activeOption) ? activeOption.id : null',
    '[attr.aria-expanded]': 'autocompleteDisabled ? null : panelOpen.toString()',
    '[attr.aria-owns]': '(autocompleteDisabled || !panelOpen) ? null : autocomplete?.id',
    '[attr.aria-haspopup]': '!autocompleteDisabled',
    '(focusin)': '_handleFocus()',
    '(blur)': '_onTouched()',
    '(input)': '_handleInput($event)',
    '(keydown)': '_handleKeydown($event)',
  },
  exportAs: 'matAutocompleteTrigger',
})
export class PointAutocompleteTriggerDirective extends _MatAutocompleteTriggerBase {
  protected _aboveClass = 'mat-autocomplete-panel-above';
}
