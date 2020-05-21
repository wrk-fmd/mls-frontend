import {Component} from '@angular/core';

import {ConcernDto} from 'mls-coceso-api';
import {NotificationService} from 'mls-common-forms';

import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {ConcernDataService} from '../../services';

@Component({
  templateUrl: './concern-overview.component.html'
})
export class ConcernOverviewComponent {

  readonly concern: Observable<ConcernDto>;
  loading: boolean;

  constructor(private readonly concernService: ConcernDataService, private readonly notificationService: NotificationService) {
    this.concern = concernService.getActiveConcern();
  }

  setConcernOpen(open: boolean) {
    this.loading = true;
    this.concernService.setConcernOpen(open).pipe(
        finalize(() => this.loading = false)
    ).subscribe(this.notificationService.onError(open ? 'concern.open.error' : 'concern.close.error'));
  }
}
