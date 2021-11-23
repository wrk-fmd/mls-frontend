import {Component, OnDestroy} from '@angular/core';
import {Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {ContactDto, StaffMemberDto} from 'mls-coceso-api';
import {ChangedItems, NotificationService, TrackingFormBuilder, TrackingFormGroup} from 'mls-common-forms';
import {DialogContent} from 'mls-common-ui';

import {ReplaySubject, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

import {StaffHelper} from '../../../helpers';
import {StaffDataService} from '../../../services';

@Component({
  templateUrl: './staff-edit-form.component.html'
})
export class StaffEditFormComponent implements DialogContent<any>, OnDestroy {

  readonly windowTitle = new ReplaySubject<string>(1);

  private id?: number;
  private afterSaveCallback?: () => void;

  form: TrackingFormGroup;
  personnelId: number[] = [];
  contacts: ContactDto[] = [];

  private personnelIdChanges?: ChangedItems<number>;
  private contactChanges?: ChangedItems<ContactDto>;

  private subscription?: Subscription;

  constructor(private readonly staffService: StaffDataService, private readonly staffHelper: StaffHelper,
              private readonly translateService: TranslateService, private readonly notificationService: NotificationService,
              fb: TrackingFormBuilder) {
    this.form = fb.group({
      lastname: ['', Validators.compose([Validators.required, Validators.maxLength(64)])],
      firstname: ['', Validators.compose([Validators.required, Validators.maxLength(64)])],
      info: ['', null, null, true],
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  set data(data: any) {
    this.id = data?.id;
    this.afterSaveCallback = data?.afterSaveCallback;

    this.load();

    if (data) {
      // Set passed values if given
      this.form.patchValue(data);
      this.form.markAsUntouched();
    }
  }

  private load() {
    this.subscription?.unsubscribe();
    if (this.id) {
      this.staffService.getById(this.id).subscribe(data => this.setStaffMember(data));
    } else {
      // Set "server value" to defaults if creating a new staff member
      this.form.setServerValue({
        call: '',
        section: null,
        types: [],
        info: '',
        home: '',
        options: []
      });
    }
  }

  private setStaffMember(member?: StaffMemberDto) {
    this.windowTitle.next(this.buildTitle(member));

    if (!member) {
      return;
    }

    this.form.setServerValue({
      lastname: member.lastname,
      firstname: member.firstname,
      info: member.info,
    });

    this.personnelId = member.personnelId;
    this.contacts = member.contacts;
  }

  private buildTitle(member?: StaffMemberDto): string {
    if (!this.id) {
      return this.translateService.instant('staff.form.create.label');
    }

    const prefix = this.translateService.instant('staff.form.edit.label');
    return member ? `${prefix}: ${this.staffHelper.getName(member)}` : prefix;
  }

  get saveDisabled(): boolean {
    return this.form.invalid || (this.form.pristine
        && (!this.personnelIdChanges || !this.personnelIdChanges.dirty)
        && (!this.contactChanges || !this.contactChanges.dirty)
    );
  }

  setPersonnelIdChanges(changes: ChangedItems<number>) {
    this.personnelIdChanges = changes;
  }

  setContactChanges(changes: ChangedItems<ContactDto>) {
    this.contactChanges = changes;
  }

  save() {
    const data = {
      lastname: this.form.value.lastname,
      firstname: this.form.value.firstname,
      info: this.form.value.info,
      personnelId: this.personnelIdChanges && this.personnelIdChanges.dirty ? this.personnelIdChanges.values : undefined,
      contacts: this.contactChanges && this.contactChanges.dirty ? this.contactChanges.values : undefined
    };

    if (this.id) {
      this.staffService.updateStaffMember(this.id, data)
          .pipe(tap(() => this.afterSave()))
          .subscribe(this.notificationService.onError('staff.form.edit.error'));
    } else {
      this.staffService.createStaffMember(data)
          .pipe(tap(id => this.afterSave(id)))
          .subscribe(this.notificationService.onError('staff.form.create.error'));
    }
  }

  private afterSave(id?: number) {
    if (id) {
      this.id = id;
    }
    this.load();
    this.afterSaveCallback?.()
  }
}
