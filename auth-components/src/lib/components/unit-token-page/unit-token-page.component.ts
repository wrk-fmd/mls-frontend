import {Component, Input} from '@angular/core';
import {UnitTokenDto} from 'mls-auth-api';

@Component({
  selector: 'mls-auth-unit-token-page',
  templateUrl: './unit-token-page.component.html',
  styleUrls: ['./unit-token-page.component.scss']
})
export class UnitTokenPageComponent {

  @Input()
  unit?: UnitTokenDto;

  constructor() {
  }
}
