import {Injectable, Type} from '@angular/core';
import {WindowOptions, WinmanComponent} from '../components/windows/manager/winman.component';
import {DialogWindowContent} from '../components/windows/window/window.component';

@Injectable()
export class WindowService {

  private component: WinmanComponent;

  setComponent(component: WinmanComponent) {
    this.component = component;
  }

  open(component: Type<DialogWindowContent>, componentData?: any, options?: WindowOptions) {
    if (this.component) {
      this.component.open(component, componentData, options);
    }
  }
}
