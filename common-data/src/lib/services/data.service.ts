import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {auditTime, map} from 'rxjs/operators';

import {DeletionDto, isDeletion, isReplayStart, ListOptions, ReplayStartDto} from '../models';

@Injectable()
export abstract class DataService<T extends Entity> implements OnDestroy {

  private readonly subscription: Subscription;
  private readonly data: BehaviorSubject<Map<number, T>>;

  protected constructor(dataSource: Observable<T | DeletionDto | ReplayStartDto>) {
    this.data = new BehaviorSubject(new Map());
    this.subscription = dataSource.subscribe(item => this.handleUpdate(item));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.clear();
  }

  public getAll(options?: ListOptions<T>): Observable<T[]> {
    options = options || new ListOptions();
    options.addSort(...this.defaultSort());

    return this.data.pipe(
        auditTime(50),
        map(data => options!.apply([...data.values()]))
    );
  }

  getAllOrNull(options?: ListOptions<T>): Observable<T[] | null> {
    return this.getAll(options).pipe(
        map(data => data.length ? data : null)
    );
  }

  protected defaultSort(): ((a: T, b: T) => number)[] {
    return [(a, b) => (b.id || 0) - (a.id || 0)];
  }

  public getData(): Observable<Map<number, T>> {
    return this.data;
  }

  public getById(id?: number): Observable<T | undefined> {
    return id !== undefined ? this.data.pipe(map(data => data.get(id))) : of(undefined);
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
    this.data.value.set(item.id || 0, item);
    this.data.next(this.data.value);
  }

  private deleteItem(id: number): void {
    this.data.value.delete(id);
    this.data.next(this.data.value);
  }
}

export interface Entity {
  id: number | null;
}
