import {Component, Input} from '@angular/core';

import {ContainerDto, UnitDto} from 'mls-coceso-api';

import {combineLatest, Observable, ReplaySubject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ContainerDataService} from '../../../services/container.data.service';
import {UnitDataService} from '../../../services/unit.data.service';

@Component({
  selector: 'mls-main-unit-container',
  templateUrl: './unit-container.component.html',
  styleUrls: ['./unit-container.component.scss']
})
export class UnitContainerComponent {

  readonly _container = new ReplaySubject<ContainerDto>(1);

  readonly units: Observable<UnitDto[]>;
  readonly children: Observable<ContainerDto[]>;

  @Input() set container(value: ContainerDto) {
    this._container.next(value);
  }

  constructor(private readonly containerService: ContainerDataService, private readonly unitService: UnitDataService) {
    this.units = this._container.pipe(
        switchMap(c => combineLatest(c.units.map(id => this.unitService.getById(id)))),
        map(units => this.filter(units))
    );

    this.children = this._container.pipe(
        switchMap(c => combineLatest(c.children.map(id => this.containerService.getCompact(id)))),
        map(children => this.filter(children))
    );
  }

  private filter<T>(list: T[]): T[] {
    const filtered = list.filter(item => !!item);
    return filtered.length ? filtered : null;
  }
}
