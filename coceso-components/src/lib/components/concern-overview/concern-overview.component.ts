import {Component} from '@angular/core';
import {ConcernDto} from 'mls-coceso-api';
import {Observable} from 'rxjs';

import {ConcernDataService} from '../../services/concern.data.service';

@Component({
  templateUrl: './concern-overview.component.html',
  styleUrls: ['./concern-overview.component.scss']
})
export class ConcernOverviewComponent {

  readonly concern: Observable<ConcernDto>;
  loading: boolean;

  constructor(private readonly concernService: ConcernDataService) {
    this.concern = concernService.getActiveConcern();
  }

  setConcernOpen(open: boolean) {
    this.loading = true;
    this.concernService.setConcernOpen(open).subscribe(
        () => {
          this.loading = false;
        },
        error => {
          this.loading = false;
          // TODO
          console.log(error);
        }
    );
  }
}
