import {Component, OnDestroy} from '@angular/core';
import {Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {ContactDto, StaffMemberDto, UnitDto, UnitStateDto} from 'mls-coceso-api';
import {NotificationService, TrackingFormBuilder, TrackingFormGroup} from 'mls-common-forms';
import {DialogContent} from 'mls-common-ui';

import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';
import {shareReplay, switchMap} from 'rxjs/operators';
import {StaffHelper} from '../../../helpers/staff.helper';

import {UnitWithIncidents} from '../../../models';
import {TaskDataService, UnitDataService} from '../../../services';

@Component({
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent implements DialogContent<any>, OnDestroy {

  readonly windowTitle = new ReplaySubject<string>(1);
  readonly taskTitle = new ReplaySubject<string>(1);

  readonly states = Object.values(UnitStateDto);

  private readonly id = new BehaviorSubject<number>(null);
  private readonly unitSubscription: Subscription;

  readonly unit: Observable<UnitWithIncidents>;

  form: TrackingFormGroup;
  contacts: ContactDto[];
  crew: StaffMemberDto[];

  constructor(private readonly unitService: UnitDataService, taskService: TaskDataService, private readonly staffHelper: StaffHelper,
              private readonly translateService: TranslateService, private readonly notificationService: NotificationService,
              fb: TrackingFormBuilder) {
    this.form = fb.group({
      call: ['', Validators.required],
      state: [null, Validators.required],
      info: ['', null, null, true],
      home: [''],
      position: ['']
    });

    this.unit = this.id.pipe(
        switchMap(id => taskService.getUnit(id)),
        shareReplay(1)
    );

    this.unitSubscription = this.unit.subscribe(unit => this.setUnit(unit));
  }

  ngOnDestroy() {
    this.unitSubscription.unsubscribe();
  }

  set data(data) {
    this.id.next(data ? data.id : null);
  }

  private setUnit(unit: UnitDto) {
    this.windowTitle.next(this.buildTitle(unit));
    this.taskTitle.next(unit ? unit.call : '');

    if (!unit) {
      return;
    }

    this.form.setServerValue({
      call: unit.call,
      state: unit.state,
      info: unit.info,
      home: unit.home ? unit.home.info : '',
      position: unit.position ? unit.position.info : ''
    });

    this.contacts = unit.contacts;
    this.crew = unit.crew;
  }

  private buildTitle(unit): string {
    const prefix = this.translateService.instant('unit.form.edit');
    return unit ? `${prefix}: ${unit.call}` : prefix;
  }

  getName(member: StaffMemberDto): string {
    return this.staffHelper.getName(member);
  }

  get saveDisabled(): boolean {
    return this.form.invalid || this.form.pristine;
  }

  save() {
    const unitId = this.id.value;
    if (!unitId) {
      return;
    }

    const data = {
      state: this.form.value.state,
      info: this.form.value.info,
      position: {info: this.form.value.position}
    };

    this.unitService.updateUnit(unitId, data)
        .subscribe(this.notificationService.onError('unit.update.error'));
  }
}
