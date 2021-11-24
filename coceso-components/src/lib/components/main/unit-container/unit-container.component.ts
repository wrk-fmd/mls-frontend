import {Component, Input} from '@angular/core';
import {ContainerWithDependencies} from '../../../models';

@Component({
  selector: 'coceso-main-unit-container',
  templateUrl: './unit-container.component.html',
  styleUrls: ['./unit-container.component.scss']
})
export class UnitContainerComponent {

  @Input()
  container?: ContainerWithDependencies;

  @Input()
  hiddenContainers?: Set<number>;

  trackById(index: number, item: ContainerWithDependencies): number | null {
    return item.id;
  }

  isExpanded(id: number | null): boolean {
    // Check if the id of this container has been hidden (default to 'not hidden')
    return !id || !this.hiddenContainers?.has(id);
  }

  setExpanded(id: number | null, expanded: boolean) {
    if (!id || !this.hiddenContainers) {
      return;
    }

    if (expanded) {
      this.hiddenContainers.delete(id);
    } else {
      this.hiddenContainers.add(id);
    }
  }
}
