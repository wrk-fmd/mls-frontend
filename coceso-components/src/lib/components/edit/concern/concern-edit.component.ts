import {Component, OnDestroy} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import {ConcernDto} from 'mls-coceso-api';
import {NotificationService, TrackingFormBuilder, TrackingFormGroup} from 'mls-common';
import {Subscription} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

import {ConcernDataService} from '../../../services/concern.data.service';

@Component({
  selector: 'coceso-edit-concern',
  templateUrl: './concern-edit.component.html'
})
export class ConcernEditComponent implements OnDestroy {

  private readonly concernSubscription: Subscription;

  readonly form: TrackingFormGroup;
  readonly sectionForm: FormControl;
  sections: string[];

  private loading: boolean;

  constructor(private readonly concernService: ConcernDataService, private readonly notificationService: NotificationService,
              fb: TrackingFormBuilder) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      info: ['']
    });
    this.sectionForm = fb.control('', [Validators.required, Validators.maxLength(30)]);

    this.concernSubscription = this.concernService.getActiveConcern().subscribe(concern => this.setConcern(concern));
  }

  ngOnDestroy() {
    this.concernSubscription.unsubscribe();
  }

  private setConcern(concern: ConcernDto) {
    concern = concern || {};
    this.form.setServerValue({
      name: concern.name || '',
      info: concern.info || ''
    });
    this.sections = concern.sections ? concern.sections.sort() : [];
  }

  get saveDisabled(): boolean {
    return this.loading || this.form.invalid || this.form.pristine;
  }

  save() {
    this.loading = true;
    const data = {
      name: this.form.value.name,
      info: this.form.value.info
    };
    this.concernService.updateConcern(data).pipe(
        finalize(() => this.loading = false)
    ).subscribe(this.notificationService.onError('concern.update.error'));
  }

  addSection(section: string) {
    if (!this.sectionForm.valid || this.loading) {
      return;
    }

    this.loading = true;
    const data = {
      name: section
    };

    this.concernService.addSection(data).pipe(
        tap(() => this.sectionForm.reset()),
        finalize(() => this.loading = false)
    ).subscribe(this.notificationService.onError('concern.section.error'));
  }

  removeSection(section: string) {
    if (!section || this.loading) {
      return;
    }

    this.loading = true;
    this.concernService.removeSection(section).pipe(
        finalize(() => this.loading = false)
    ).subscribe(this.notificationService.onError('concern.section.error'));
  }
}
