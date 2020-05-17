import {Component, Input} from '@angular/core';
import {UnitDto} from 'mls-coceso-api';
import {Observable, ReplaySubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ContainerDataService} from '../../../services/container.data.service';
import {UnitDataService} from '../../../services/unit.data.service';

@Component({
  selector: 'mls-container-edit-unit',
  templateUrl: './container-unit.component.html',
  styleUrls: ['./container-unit.component.scss']
})
export class ContainerEditUnitComponent {

  private readonly _id = new ReplaySubject<number>(1);
  readonly unit: Observable<UnitDto>;

  @Input()
  set unitId(id: number) {
    this._id.next(id);
  }

  constructor(private readonly containerService: ContainerDataService, private readonly unitService: UnitDataService) {
    this.unit = this._id.pipe(switchMap(id => this.unitService.getById(id)));
  }
}
