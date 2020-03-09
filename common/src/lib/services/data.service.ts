import {Injectable, OnDestroy} from '@angular/core';
import {DeletionDto, isDeletion, isReplayStart, ReplayStartDto} from 'mls-stomp';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {auditTime, map} from 'rxjs/operators';

@Injectable()
export abstract class DataService<T extends Entity> implements OnDestroy {

  private subscription: Subscription;

  private readonly data: BehaviorSubject<Map<number, T>>;
  private readonly list: Observable<T[]>;

  protected constructor() {
    this.data = new BehaviorSubject(new Map());
    this.list = this.data.pipe(auditTime(50), map(data => Array.from(data.values()).sort(this.compare)));
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  protected subscribe(dataSource: Observable<T | DeletionDto | ReplayStartDto>) {
    this.unsubscribe();
    this.subscription = dataSource.subscribe(item => this.handleUpdate(item));
  }

  protected unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.clear();
  }

  protected compare(a: T, b: T): number {
    return a.id - b.id;
  }

  public getAll(): Observable<T[]> {
    return this.list;
  }

  public getById(id: number): Observable<T> {
    return this.data.pipe(map(data => data.get(id) || null));
  }

  private handleUpdate(item: T | DeletionDto | ReplayStartDto) {
    if (isReplayStart(item)) {
      this.clear();
    } else if (isDeletion(item)) {
      this.deleteItem(item.id);
    } else {
      this.updateItem(item);
    }
  }

  private clear(): void {
    this.data.value.clear();
    this.data.next(this.data.value);
  }

  private updateItem(item: T): void {
    this.data.value.set(item.id, item);
    this.data.next(this.data.value);
  }

  private deleteItem(id: number): void {
    this.data.value.delete(id);
    this.data.next(this.data.value);
  }
}

export interface Entity {
  id?: number;
}
