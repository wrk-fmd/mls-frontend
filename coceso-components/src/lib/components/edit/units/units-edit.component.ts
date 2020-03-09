import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {UnitDto, UnitTypeDto} from 'mls-coceso-api';
import {TrackingFormBuilder, TrackingFormControl} from 'mls-common';
import {Observable} from 'rxjs';
import {ConcernDataService} from '../../../services/concern.data.service';
import {UnitDataService} from '../../../services/unit.data.service';

@Component({
  selector: 'mls-units-edit',
  templateUrl: './units-edit.component.html',
  styleUrls: ['./units-edit.component.scss']
})
export class UnitsEditComponent implements OnInit, OnDestroy {

  readonly displayedColumns = ['call', 'type', 'info', 'actions'];
  readonly units = new MatTableDataSource<FormGroup>();

  readonly sections: Observable<string[]>;
  readonly types = Object.values(UnitTypeDto);

  readonly forms = new Map<number, FormGroup>();
  readonly createForm;

  constructor(private readonly unitService: UnitDataService, concernService: ConcernDataService, private readonly fb: TrackingFormBuilder) {
    this.createForm = this.createFormGroup();
    this.sections = concernService.getSections();
  }

  ngOnInit(): void {
    this.unitService.getAll().subscribe(units => this.setUnits(units));
  }

  ngOnDestroy(): void {
  }

  private setUnits(units: UnitDto[]) {
    units.forEach(unit => this.setUnit(unit));
    this.units.data = Array.from(this.forms.values());
  }

  private setUnit(unit: UnitDto) {
    if (this.forms.has(unit.id)) {
      const form = this.forms.get(unit.id);
      (form.controls.call as TrackingFormControl).setServerValue(unit.call || '');
      (form.controls.info as TrackingFormControl).setServerValue(unit.info || '');
      (form.controls.type as TrackingFormControl).setServerValue(unit.type || null);
      (form.controls.section as TrackingFormControl).setServerValue(unit.section || null);
    } else {
      this.forms.set(unit.id, this.createFormGroup(unit));
    }
  }

  private createFormGroup(unit?: UnitDto): FormGroup {
    unit = unit || {};
    return this.fb.group({
      id: [unit.id || null],
      call: [unit.call || '', Validators.required],
      info: [unit.info || ''],
      type: [unit.type || null, Validators.required],
      section: [unit.section || null]
    });
  }

  submitDisabled(form: FormGroup) {
    return form.invalid || form.pristine;
  }

  submit(form: FormGroup) {
    const data = {
      call: form.value.call,
      info: form.value.info,
      type: form.value.type,
      section: form.value.section || ''
    };
    const id = form.value.id;

    if (id) {
      this.unitService.updateUnit(id, data).subscribe(() => console.log('done'));
    } else {
      this.unitService.createUnit(data).subscribe(() => this.createForm.reset());
    }
  }
}
