import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ConcernDto} from 'mls-coceso-api';
import {NotificationService} from 'mls-common';

import {Observable} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';

import {ConcernDataService} from '../../services/concern.data.service';

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
    this.open = this.getFiltered(false);
    this.closed = this.getFiltered(true);
  }

  private getFiltered(closed: boolean): Observable<ConcernDto[]> {
    return this.concernService.getAll().pipe(
        map(concerns => concerns.filter(c => c.closed === closed)),
        map(concerns => concerns.length ? concerns : null)
    );
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
