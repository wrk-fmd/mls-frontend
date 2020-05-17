import {Injectable, Type} from '@angular/core';
import {DialogContent} from '../components/windows/dialog/dialog.component';
import {WindowOptions, WinmanComponent} from '../components/windows/manager/winman.component';

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
