import {Component, Predicate} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ListOptions} from 'mls-common-data';
import {DialogContent} from 'mls-common-ui';

import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

import {UnitHelper} from '../../../helpers';
import {UnitWithIncidents} from '../../../models';
import {TaskDataService} from '../../../services';

@Component({
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements DialogContent<UnitListOptions> {

  readonly windowTitle: Observable<string>;
  readonly taskTitle = new ReplaySubject<string>(1);

  units: Observable<UnitWithIncidents[]>;
  private readonly filter = new BehaviorSubject<Predicate<UnitWithIncidents> | undefined>(undefined);

  constructor(private readonly taskService: TaskDataService, private readonly unitHelper: UnitHelper,
              private readonly translateService: TranslateService) {
    this.units = this.filter.pipe(
        switchMap(filter => this.loadUnits(filter)),
        shareReplay(1)
    );

    this.windowTitle = combineLatest([this.units, this.taskTitle]).pipe(
        map(([units, titlePrefix]) => `${titlePrefix} (${units.length})`)
    );
  }

  private loadUnits(filter?: Predicate<UnitWithIncidents>): Observable<UnitWithIncidents[]> {
    const options = new ListOptions<UnitWithIncidents>();
    if (filter) {
      options.addFilters(filter);
    }
    return this.taskService.getUnits(options);
  }

  set data(data: UnitListOptions) {
    data = data || {};

    let filterPredicate = undefined;
    let titlePrefix = 'unit.views.overview';

    switch (data.filter) {
      case UnitListFilter.ALARM:
        filterPredicate = (u: UnitWithIncidents) => this.unitHelper.hasAssigned(u);
        titlePrefix = 'unit.views.alarm';
        break;
      case UnitListFilter.WAITING:
        filterPredicate = (u: UnitWithIncidents) => this.unitHelper.isWaiting(u);
        titlePrefix = 'unit.views.waiting';
        break;
      case UnitListFilter.AVAILABLE:
        filterPredicate = (u: UnitWithIncidents) => this.unitHelper.isAvailable(u);
        titlePrefix = 'unit.views.available';
        break;
    }

    this.filter.next(filterPredicate);
    this.taskTitle.next(this.translateService.instant(titlePrefix));
  }
}

export interface UnitListOptions {
  filter?: UnitListFilter;
}

export enum UnitListFilter {
  ALARM, WAITING, AVAILABLE
}
