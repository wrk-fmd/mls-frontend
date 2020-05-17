import {CdkDropList} from '@angular/cdk/drag-drop';
import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class DropListService {

  private readonly lists = new Map<string, BehaviorSubject<CdkDropList[]>>();

  registerList(type: string, list: CdkDropList): void {
    if (list) {
      setTimeout(() => {
        const subject = this.getForSubjectType(type);
        subject.value.push(list);
        subject.next(subject.value);
      }, 0);
    }
  }

  removeList(type: string, list: CdkDropList): void {
    setTimeout(() => {
      const subject = this.getForSubjectType(type);
      subject.next(subject.value.filter(l => l !== list));
    }, 0);
  }

  getLists(type: string): Observable<CdkDropList[]> {
    return this.getForSubjectType(type);
  }

  private getForSubjectType(type: string): BehaviorSubject<CdkDropList[]> {
    if (!this.lists.has(type)) {
      this.lists.set(type, new BehaviorSubject([]));
    }
    return this.lists.get(type);
  }
}
