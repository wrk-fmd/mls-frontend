import {CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {Validators} from '@angular/forms';

import {ContainerDto} from 'mls-coceso-api';
import {NotificationService, TrackingFormBuilder, TrackingFormGroup} from 'mls-common';

import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {ContainerDataService} from '../../../services/container.data.service';
import {DropListService} from '../../../services/drop-list.service';

@Component({
  selector: 'mls-container-edit-child',
  templateUrl: './container-child.component.html',
  styleUrls: ['./container-child.component.scss']
})
export class ContainerEditChildComponent implements AfterViewInit, OnDestroy {

  readonly form: TrackingFormGroup;
  editing: boolean;

  private readonly _id = new BehaviorSubject<number>(null);
  readonly container: Observable<ContainerDto>;
  readonly containerSubscription: Subscription;

  @Input() set containerId(id: number) {
    this._id.next(id);
  }

  private _unitList: CdkDropList;
  private _childrenList: CdkDropList;

  readonly unitLists: Observable<CdkDropList[]>;
  readonly childrenLists: Observable<CdkDropList[]>;

  @ViewChild('nameInput') nameInput: HTMLInputElement;

  constructor(private readonly containerService: ContainerDataService, private readonly notificationService: NotificationService,
              private readonly dropListService: DropListService, private readonly cdr: ChangeDetectorRef, fb: TrackingFormBuilder) {
    this.container = this._id.pipe(switchMap(id => this.containerService.getById(id)));

    this.unitLists = dropListService.getLists('container-units');
    this.childrenLists = dropListService.getLists('container-children');

    this.form = fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]]
    });
    this.containerSubscription = this.container.subscribe(c => this.form.setServerValue({
      name: c ? c.name : ''
    }));
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
    this.containerSubscription.unsubscribe();
  }

  editName() {
    this.editing = true;
    // this.nameInput.focus();
  }

  submitName() {
    if (this.form.invalid || this.form.pristine) {
      this.editing = false;
      return;
    }

    this.containerService.updateContainer(this._id.value, {
      name: this.form.value.name
    }).pipe(
        tap(() => this.editing = false)
    ).subscribe(this.notificationService.onError('container.update.error'));
  }

  createContainer() {
    const data = {
      name: 'New container',
      parent: this._id.value
    };
    this.containerService.createContainer(data)
        .subscribe(this.notificationService.onError('container.create.error'));
  }

  deleteContainer() {
    this.containerService.deleteContainer(this._id.value)
        .subscribe(this.notificationService.onError('container.delete.error'));
  }

  dropUnit(event: CdkDragDrop<any>) {
    console.log('dropped unit', event);
    const containerId = this._id.value;
    const unitId = event.item.data;
    const index = event.currentIndex;
    if (event.isPointerOverContainer && containerId && unitId) {
      this.containerService.updateUnit(containerId, unitId, index).subscribe(() => console.log('done'));
    }
  }

  dropContainer(event: CdkDragDrop<any>) {
    console.log('dropped container', event);
    const containerId = event.item.data;
    const data = {
      parent: this._id.value,
      index: event.currentIndex
    };
    this.containerService.updateContainer(containerId, data).subscribe(() => console.log('done'));
  }
}
