import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ConcernDto} from 'mls-coceso-api';
import {ListOptions} from 'mls-common-data';
import {NotificationService} from 'mls-common-forms';

import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

import {ConcernDataService} from '../../services';

@Component({
  templateUrl: './concern-list.component.html',
  styleUrls: ['./concern-list.component.scss']
})
export class ConcernListComponent {

  readonly form: FormGroup;
  readonly open: Observable<ConcernDto[]>;
  readonly closed: Observable<ConcernDto[]>;

  private loading: boolean;

  constructor(private readonly concernService: ConcernDataService, private readonly notificationService: NotificationService,
              fb: FormBuilder) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    });
    this.open = concernService.getAll(new ListOptions<ConcernDto>(true).addFilters(c => !c.closed));
    this.closed = concernService.getAll(new ListOptions<ConcernDto>(true).addFilters(c => c.closed));
  }

  get createDisabled(): boolean {
    return this.loading || this.form.invalid || this.form.pristine;
  }

  create() {
    this.loading = true;
    this.concernService.createConcern({name: this.form.value.name}).pipe(
        tap(() => this.form.reset()),
        finalize(() => this.loading = false)
    ).subscribe(this.notificationService.onError('concern.create.error'));
  }
}
