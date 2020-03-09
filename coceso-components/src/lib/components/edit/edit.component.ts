import {Component} from '@angular/core';
import {ConcernDto} from 'mls-coceso-api';
import {Observable} from 'rxjs';
import {ConcernDataService} from '../../services/concern.data.service';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  readonly concern: Observable<ConcernDto>;

  constructor(concernService: ConcernDataService) {
    this.concern = concernService.getActiveConcern();
  }
}
