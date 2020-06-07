import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogContent} from 'mls-common-ui';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {ContainerWithDependencies} from '../../../models';
import {ContainerDataService} from '../../../services';

@Component({
  templateUrl: './unit-hierarchy.component.html'
})
export class UnitHierarchyComponent implements DialogContent<null> {

  readonly windowTitle: Observable<string>;
  readonly taskTitle: Observable<string>;

  readonly container: Observable<ContainerWithDependencies>;

  constructor(containerService: ContainerDataService, translateService: TranslateService) {
    this.container = containerService.getRootWithDependencies();

    const titlePrefix = translateService.instant('main.nav.units.hierarchy');
    this.taskTitle = of(titlePrefix);
    this.windowTitle = this.container.pipe(
        map(container => container ? `${titlePrefix} (${container.availableUnits}/${container.totalUnits})` : titlePrefix)
    );
  }

  set data(_) {
  }
}
