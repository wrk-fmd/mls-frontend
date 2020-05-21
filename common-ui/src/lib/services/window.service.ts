import {Injectable, Type} from '@angular/core';
import {DialogContent, WindowOptions, WinmanComponent} from '../components';

@Injectable()
export class WindowService {

  private component: WinmanComponent;

  setComponent(component: WinmanComponent) {
    this.component = component;
  }

  open<T>(component: Type<DialogContent<T>>, componentData?: T, options?: WindowOptions) {
    if (this.component) {
      this.component.open(component, componentData, options);
    }
  }
}
