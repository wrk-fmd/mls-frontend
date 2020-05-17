import {Component, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {UnitDto} from 'mls-coceso-api';
import {DialogContent} from 'mls-common';

import {Observable, ReplaySubject, Subscription} from 'rxjs';

import {UnitDataService} from '../../../services/unit.data.service';

@Component({
  selector: 'mls-coceso-incident-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements DialogContent, OnDestroy {

  readonly windowTitle = new ReplaySubject<string>(1);
  readonly taskTitle = new ReplaySubject<string>(1);

  units: Observable<UnitDto[]>;
  private readonly unitsSubscription: Subscription;

  constructor(private readonly unitService: UnitDataService, private readonly translateService: TranslateService) {
    this.units = this.unitService.getAll();
    this.unitsSubscription = this.units.subscribe(units => this.updateTitles(units));
  }

  ngOnDestroy() {
    this.unitsSubscription.unsubscribe();
  }

  set data(_) {
  }

  private updateTitles(units: UnitDto[]) {
    const prefix = this.translateService.instant('main.nav.units.overview');

    // TODO Unit counts
    this.windowTitle.next(prefix);
    this.taskTitle.next(prefix);
  }
}
