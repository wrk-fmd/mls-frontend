import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

import {UnitEndpointService, UnitTokenDto} from 'mls-auth-api';

@Component({
  selector: 'mls-auth-unit-token-list',
  templateUrl: './unit-token-list.component.html',
  styleUrls: ['./unit-token-list.component.css']
})
export class UnitTokenListComponent implements OnInit, OnDestroy {

  units: UnitTokenDto[] = [];

  private routeSubscription?: Subscription;

  constructor(private readonly unitService: UnitEndpointService,
              private readonly translateService: TranslateService,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => this.loadConcern(+(params.get('concernId') || 0)));
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private loadConcern(id: number | null) {
    if (id) {
      this.unitService.getTokens({concern: id}).subscribe(units => this.units = units);
    } else {
      this.units = [];
    }
  }
}
