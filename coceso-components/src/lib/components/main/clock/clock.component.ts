import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ClockService} from '../../../services/clock.service';

@Component({
  selector: 'coceso-main-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent {

  readonly timestamp: Observable<number>;

  constructor(clockService: ClockService) {
    this.timestamp = clockService.timestamp;
  }
}
