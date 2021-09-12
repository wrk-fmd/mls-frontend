/**
 * This class tracks added and removed items in a list
 */
export class AddRemoveContainer<K, V> implements ChangedItems<V> {

  private _values: V[] | null = [];
  private readonly _keyed = new Map<K, V>();
  private readonly _added = new Map<K, V>();
  private readonly _removed = new Map<K, V>();

  constructor(private readonly getKey: (value: V) => K) {
  }

  get values(): V[] {
    if (!this._values) {
      // Cache the array form of the values so it doesn't need to be rebuilt all the time
      this._values = [...this._keyed.values()];
    }
    return this._values;
  }

  set values(values: V[]) {
    values = values || [];

    // Ignore all values that have been marked as "removed"
    values = values.filter(v => !this._removed.has(this.getKey(v)));

    // Unmark "added" items if already in list
    values.forEach(v => this._added.delete(this.getKey(v)));

    // Add all "added" items to the list
    this._added.forEach(v => values.push(v));

    // Build a keyed map of item keys to make lookup faster
    this._keyed.clear();
    values.forEach(v => this._keyed.set(this.getKey(v), v));

    // Unmark "removed" items that are not in list anyway
    [...this._removed.keys()]
        .filter(k => !this._keyed.has(k))
        .forEach(k => this._removed.delete(k));

    // Rebuilt the array form of the list
    this._values = null;
  }

  get added(): V[] {
    return [...this._added.values()];
  }

  get removed(): V[] {
    return [...this._removed.values()];
  }

  get dirty(): boolean {
    return this._added.size > 0 || this._removed.size > 0;
  }

  add(item: V): boolean {
    const key = this.getKey(item);
    if (this._keyed.has(key)) {
      // Already added
      return false;
    }

    this._keyed.set(key, item);
    if (!this._removed.delete(key)) {
      this._added.set(key, item);
    }
    this._values = null;
    return true;
  }

  remove(item: V): boolean {
    const key = this.getKey(item);
    if (!this._keyed.has(key)) {
      // Not present
      return false;
    }

    this._keyed.delete(key);
    if (!this._added.delete(key)) {
      this._removed.set(key, item);
    }
    this._values = null;
    return true;
  }
}

export interface ChangedItems<T> {

  values: T[];
  readonly added: T[];
  readonly removed: T[];
  readonly dirty: boolean;
}
