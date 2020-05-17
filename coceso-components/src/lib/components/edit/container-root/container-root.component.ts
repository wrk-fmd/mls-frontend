import {CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';

import {ContainerDto} from 'mls-coceso-api';

import {Observable} from 'rxjs';

import {ContainerDataService} from '../../../services/container.data.service';
import {DropListService} from '../../../services/drop-list.service';

@Component({
  selector: 'mls-container-edit-root',
  templateUrl: './container-root.component.html',
  styleUrls: ['./container-root.component.scss']
})
export class ContainerEditRootComponent implements AfterViewInit, OnDestroy {

  readonly root: Observable<ContainerDto>;

  private _unitList: CdkDropList;
  private _childrenList: CdkDropList;

  readonly unitLists: Observable<CdkDropList[]>;
  readonly childrenLists: Observable<CdkDropList[]>;

  constructor(private readonly containerService: ContainerDataService, private readonly dropListService: DropListService,
              private readonly cdr: ChangeDetectorRef) {
    this.root = containerService.getRoot();

    this.unitLists = dropListService.getLists('container-units');
    this.childrenLists = dropListService.getLists('container-children');
  }

  @ViewChild('unitList') set unitList(list: CdkDropList) {
    if (list !== this._unitList) {
      this.dropListService.removeList('container-units', this._unitList);
      this._unitList = list;
      this.dropListService.registerList('container-units', this._unitList);
    }
  }

  @ViewChild('childrenList') set childrenList(list: CdkDropList) {
    if (list !== this._childrenList) {
      this.dropListService.removeList('container-children', this._childrenList);
      this._childrenList = list;
      this.dropListService.registerList('container-children', this._childrenList);
    }
  }

  ngAfterViewInit(): void {
    // TODO Not nice, maybe try to refactor the whole thing somehow?
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.dropListService.removeList('container-units', this._unitList);
    this.dropListService.removeList('container-children', this._childrenList);
  }

  createContainer() {
    const data = {
      name: 'New container'
    };
    this.containerService.createContainer(data).subscribe(() => console.log('done'));
  }

  dropUnit(event: CdkDragDrop<any>) {
    console.log('dropped unit', event);
    const containerId = event.previousContainer.data;
    const unitId = event.item.data;
    if (event.isPointerOverContainer && containerId && unitId) {
      this.containerService.removeUnit(containerId, unitId).subscribe(() => console.log('done'));
    }
  }

  dropContainer(event: CdkDragDrop<any>) {
    console.log('dropped container', event);
    const containerId = event.item.data;
    const data = {
      parent: 0,
      index: event.currentIndex
    };
    this.containerService.updateContainer(containerId, data).subscribe(() => console.log('done'));
  }
}
