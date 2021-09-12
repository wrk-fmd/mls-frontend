import {Component} from '@angular/core';
import {ConcernDto} from 'mls-coceso-api';
import {Observable} from 'rxjs';
import {ConcernDataService} from '../../services/concern.data.service';

@Component({
  templateUrl: './edit.component.html'
})
export class EditComponent {

  readonly concern: Observable<ConcernDto | undefined>;

  constructor(concernService: ConcernDataService) {
    this.concern = concernService.getActiveConcern();
  }
}
