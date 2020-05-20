import {Component, OnDestroy} from '@angular/core';
import {Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {ContactDto, StaffMemberDto, UnitDto} from 'mls-coceso-api';
import {ChangedItems, DialogContent, NotificationService, TrackingFormBuilder, TrackingFormGroup} from 'mls-common';

import {BehaviorSubject, forkJoin, Observable, of, ReplaySubject, Subscription, throwError} from 'rxjs';
import {flatMap, switchMap, tap} from 'rxjs/operators';

import {UnitDataService} from '../../../services/unit.data.service';

@Component({
  templateUrl: './unit-edit-form.component.html'
})
export class UnitEditFormComponent implements DialogContent<any>, OnDestroy {

  readonly windowTitle = new ReplaySubject<string>(1);

  private readonly id = new BehaviorSubject<number>(null);
  private readonly unitSubscription: Subscription;

  form: TrackingFormGroup;
  contacts: ContactDto[];
  crew: StaffMemberDto[];

  private contactChanges: ChangedItems<ContactDto>;
  private crewChanges: ChangedItems<StaffMemberDto>;

  constructor(private readonly unitService: UnitDataService, private readonly translateService: TranslateService,
              private readonly notificationService: NotificationService, fb: TrackingFormBuilder) {
    this.form = fb.group({
      call: ['', Validators.compose([Validators.required, Validators.maxLength(64)])],
      section: [null],
      types: [[]],
      info: ['', null, null, true],
      home: [''],
      options: [[]]
    });

    this.unitSubscription = this.id
        .pipe(switchMap(id => unitService.getById(id)))
        .subscribe(unit => this.setUnit(unit));
  }

  ngOnDestroy() {
    this.unitSubscription.unsubscribe();
  }

  set data(data) {
    const id = data ? data.id : null;
    this.id.next(id);

    if (!id) {
      // Set "server value" to defaults if creating a new unit
      this.form.setServerValue({
        call: '',
        section: null,
        types: [],
        info: '',
        home: '',
        options: []
      });
    }

    if (data) {
      // Set passed values if given
      this.form.patchValue(data);
      this.form.markAsUntouched();
    }
  }

  private setUnit(unit: UnitDto) {
    this.windowTitle.next(this.buildTitle(unit));

    if (!unit) {
      return;
    }

    this.form.setServerValue({
      call: unit.call,
      section: unit.section,
      types: unit.types,
      info: unit.info,
      home: unit.home ? unit.home.info : '',
      options: unit.portable ? ['portable'] : []
    });

    this.contacts = unit.contacts;
    this.crew = unit.crew;
  }

  private buildTitle(unit): string {
    if (!this.id.value) {
      return this.translateService.instant('unit.form.add');
    }

    const prefix = this.translateService.instant('unit.form.edit');
    return unit ? `${prefix}: ${unit.call}` : prefix;
  }

  get saveDisabled(): boolean {
    return this.form.invalid || (this.form.pristine
        && (!this.contactChanges || !this.contactChanges.dirty)
        && (!this.crewChanges || !this.crewChanges.dirty)
    );
  }

  setContactChanges(changes: ChangedItems<ContactDto>) {
    this.contactChanges = changes;
  }

  setCrewChanges(changes: ChangedItems<StaffMemberDto>) {
    this.crewChanges = changes;
  }

  save() {
    const data = {
      call: this.form.value.call,
      section: this.form.value.section || '',
      types: this.form.value.types,
      info: this.form.value.info,
      home: {info: this.form.value.home},
      portable: this.form.value.options.includes('portable'),
      contacts: this.contactChanges && this.contactChanges.dirty ? this.contactChanges.values : null
    };

    const unitId = this.id.value;
    if (unitId) {
      this.unitService.updateUnit(unitId, data)
          .pipe(flatMap(() => this.saveCrew()))
          .subscribe(this.notificationService.onError('unit.update.error'));
    } else {
      this.unitService.createUnit(data)
          .pipe(tap(id => this.id.next(id)), flatMap(() => this.saveCrew()))
          .subscribe(this.notificationService.onError('unit.create.error'));
    }
  }

  private saveCrew(): Observable<any> {
    if (!this.crewChanges) {
      return of(null);
    }

    const unitId = this.id.value;
    if (!unitId) {
      return throwError('No unit id for saving crew');
    }

    const requests = [
      ...this.crewChanges.added.map(m => this.unitService.assignCrewMember(unitId, m.id)),
      ...this.crewChanges.removed.map(m => this.unitService.removeCrewMember(unitId, m.id))
    ];
    return requests.length ? forkJoin(requests) : of(null);
  }
}
