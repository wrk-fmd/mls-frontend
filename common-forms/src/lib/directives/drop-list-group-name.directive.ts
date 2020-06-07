import {CdkDropListGroup} from '@angular/cdk/drag-drop';
import {Directive, Input, OnDestroy} from '@angular/core';

/**
 * The Angular Material DropListGroup directive does not work with nested list, this monkey-patches the missing functionality
 * It has to be used in addition to the cdkDropListGroup directive
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dropListGroupName]',
  exportAs: 'dropListGroupName',
})
export class DropListGroupNameDirective<T> implements OnDestroy {

  private readonly items = new NamedDropListGroupItems<T>();

  constructor(group: CdkDropListGroup<T>) {
    // Override the default item set of the drop list group
    (group as any)._items = this.items;
  }

  /**
   * The group name for supporting multiple groups in the same DOM tree
   */
  @Input('dropListGroupName')
  set name(name: string) {
    this.items.name = name;
  }

  /**
   * The optional level so nested lists can be properly sorted from inner to outer
   */
  @Input('dropListGroupLevel')
  set level(level: number) {
    this.items.level = level;
  }

  /**
   * Whether the list can receive items (defaults to true)
   */
  @Input('dropListGroupCanReceive')
  set canReceive(canReceive: boolean) {
    this.items.canReceive = canReceive;
  }

  ngOnDestroy() {
    this.items.destroy();
  }
}

class NamedDropListGroupItems<T> extends Set<T> {

  static readonly groups = new Set<NamedDropListGroupItems<any>>();
  name: string;
  level = 0;
  canReceive = true;

  constructor() {
    super();
    NamedDropListGroupItems.groups.add(this);
  }

  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any) {
    // This is where the magic happens: Instead of just running for the items of this group run for all groups with the same name
    [...NamedDropListGroupItems.groups.values()]
        .filter(g => g.canReceive && g.name === this.name)
        // Need to have inner lists first, otherwise moving into nested lists won't work
        .sort((a, b) => b.level - a.level)
        .forEach(g => g.forEachInternal(callbackfn, thisArg));
  }

  private forEachInternal(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any) {
    return super.forEach(callbackfn, thisArg);
  }

  destroy() {
    NamedDropListGroupItems.groups.delete(this);
    this.clear();
  }
}
