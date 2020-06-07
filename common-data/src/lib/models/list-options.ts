import {Predicate} from '@angular/core';

export class ListOptions<T> {
  private readonly filter?: Predicate<T>[] = [];
  private readonly sort?: ((a: T, b: T) => number)[] = [];

  constructor(private readonly emptyAsNull = false) {
  }

  addFilters(...filters: Predicate<T>[]): this {
    this.filter.push(...filters);
    return this;
  }

  addSort(...sort: ((a: T, b: T) => number)[]): this {
    this.sort.push(...sort);
    return this;
  }

  apply(data: T[]): T[] {
    data = data.filter(item => item && !this.filter.find(predicate => !predicate(item)));

    if (this.sort.length) {
      data = data.sort((a, b) => {
        for (const comparator of this.sort) {
          const result = comparator(a, b);
          if (result) {
            return result;
          }
        }
        return 0;
      });
    }

    return data.length || !this.emptyAsNull ? data : null;
  }
}
