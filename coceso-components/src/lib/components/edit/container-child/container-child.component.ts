import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {Validators} from '@angular/forms';

import {ContainerDto} from 'mls-coceso-api';
import {NotificationService, TrackingFormBuilder, TrackingFormGroup} from 'mls-common-forms';

import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {ContainerDataService} from '../../../services';

@Component({
  selector: 'coceso-edit-container-child',
  templateUrl: './container-child.component.html',
  styleUrls: ['./container-child.component.scss']
})
export class ContainerEditChildComponent implements OnDestroy {

  readonly form: TrackingFormGroup;
  editing: boolean = false;

  private readonly _id = new BehaviorSubject<number | undefined>(undefined);
  readonly container: Observable<ContainerDto | undefined>;
  readonly containerSubscription: Subscription;

  @Input()
  level: number = 0;

  @Input() set containerId(id: number) {
    this._id.next(id);
  }

  @ViewChild('nameInput') nameInput?: HTMLInputElement;

  constructor(private readonly containerService: ContainerDataService, private readonly notificationService: NotificationService,
              fb: TrackingFormBuilder) {
    this.container = this._id.pipe(switchMap(id => this.containerService.getById(id)));

    this.form = fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]]
    });
    this.containerSubscription = this.container.subscribe(c => this.form.setServerValue({
      name: c ? c.name : ''
    }));
  }

  ngOnDestroy(): void {
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

    const id = this._id.value;
    if (!id) {
      return;
    }

    this.containerService.updateContainer(id, {
      name: this.form.value.name
    }).pipe(
        tap(() => this.editing = false)
    ).subscribe(this.notificationService.onError('unit.hierarchy.actions.error'));
  }

  createContainer() {
    const data = {
      name: 'New container',
      parent: this._id.value
    };
    this.containerService.createContainer(data)
        .subscribe(this.notificationService.onError('unit.hierarchy.actions.error'));
  }

  deleteContainer() {
    const id = this._id.value;
    if (!id) {
      return;
    }

    this.containerService.deleteContainer(id)
        .subscribe(this.notificationService.onError('unit.hierarchy.actions.error'));
  }

  dropUnit(event: CdkDragDrop<any>) {
    console.log('dropped unit', event);
    const containerId = this._id.value;
    const unitId = event.item.data;
    const index = event.currentIndex;
    if (event.isPointerOverContainer && containerId && unitId) {
      this.containerService.updateUnit(containerId, unitId, index)
          .subscribe(this.notificationService.onError('unit.hierarchy.actions.error'));
    }
  }

  dropContainer(event: CdkDragDrop<any>) {
    console.log('dropped container', event);
    const containerId = event.item.data;
    const data = {
      parent: this._id.value,
      index: event.currentIndex
    };
    this.containerService.updateContainer(containerId, data)
        .subscribe(this.notificationService.onError('unit.hierarchy.actions.error'));
  }
}
