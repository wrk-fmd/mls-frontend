import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

import {ContainerDto} from 'mls-coceso-api';
import {NotificationService} from 'mls-common-forms';

import {Observable} from 'rxjs';

import {ContainerDataService} from '../../../services/container.data.service';

@Component({
  selector: 'coceso-edit-container-root',
  templateUrl: './container-root.component.html',
  styleUrls: ['./container-root.component.scss']
})
export class ContainerEditRootComponent {

  readonly root: Observable<ContainerDto | undefined>;

  constructor(private readonly containerService: ContainerDataService, private readonly notificationService: NotificationService) {
    this.root = containerService.getRoot();
  }

  createContainer() {
    const data = {
      name: 'New container'
    };
    this.containerService.createContainer(data)
        .subscribe(this.notificationService.onError('unit.hierarchy.actions.error'));
  }

  dropUnit(event: CdkDragDrop<any>) {
    console.log('dropped unit', event);
    const containerId = event.previousContainer.data;
    const unitId = event.item.data;
    if (event.isPointerOverContainer && containerId && unitId) {
      this.containerService.removeUnit(containerId, unitId)
          .subscribe(this.notificationService.onError('unit.hierarchy.actions.error'));
    }
  }

  dropContainer(event: CdkDragDrop<any>) {
    console.log('dropped container', event);
    const containerId = event.item.data;
    const data = {
      parent: 0,
      index: event.currentIndex
    };
    this.containerService.updateContainer(containerId, data)
        .subscribe(this.notificationService.onError('unit.hierarchy.actions.error'));
  }
}
