import {Component, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {ContainerDto} from 'mls-coceso-api';
import {DialogContent} from 'mls-common-ui';

import {Observable, ReplaySubject, Subscription} from 'rxjs';

import {ContainerDataService} from '../../../services';

@Component({
  templateUrl: './unit-hierarchy.component.html'
})
export class UnitHierarchyComponent implements DialogContent, OnDestroy {

  readonly windowTitle = new ReplaySubject<string>(1);
  readonly taskTitle = new ReplaySubject<string>(1);

  readonly container: Observable<ContainerDto>;
  private readonly containerSubscription: Subscription;

  constructor(private readonly containerService: ContainerDataService, private readonly translateService: TranslateService) {
    this.container = containerService.getCompact(null);
    this.containerSubscription = this.container.subscribe(container => this.updateTitles(container));
  }

  ngOnDestroy() {
    this.containerSubscription.unsubscribe();
  }

  set data(_) {
  }

  private updateTitles(container: ContainerDto) {
    const prefix = this.translateService.instant('main.nav.units.hierarchy');

    // TODO Unit counts
    this.windowTitle.next(prefix);
    this.taskTitle.next(prefix);
  }
}
