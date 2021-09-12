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
}
