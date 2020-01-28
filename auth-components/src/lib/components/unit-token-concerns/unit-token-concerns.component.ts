import {Component, OnInit} from '@angular/core';
import {ConcernDto, ConcernEndpointService} from 'mls-auth-api';

@Component({
  selector: 'unit-token-concerns',
  templateUrl: './unit-token-concerns.component.html',
  styleUrls: ['./unit-token-concerns.component.scss']
})
export class UnitTokenConcernsComponent implements OnInit {

  concerns: ConcernDto[] = [];

  constructor(private readonly concernService: ConcernEndpointService) {
  }

  ngOnInit() {
    this.concernService.getConcerns().subscribe(concerns => this.concerns = concerns);
  }
}
