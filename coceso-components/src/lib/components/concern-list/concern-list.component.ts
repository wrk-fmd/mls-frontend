import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ConcernDto} from 'mls-coceso-api';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  constructor(private readonly concernService: ConcernDataService, fb: FormBuilder) {
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
    this.concernService.createConcern({name: this.form.value.name}).subscribe(
        () => {
          this.loading = false;
          this.form.reset();
        },
        error => {
          this.loading = false;
          // TODO
          console.log(error);
        }
    );
  }
}
