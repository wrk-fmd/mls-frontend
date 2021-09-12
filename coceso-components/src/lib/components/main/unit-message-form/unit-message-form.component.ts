import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

import {UnitDto} from 'mls-coceso-api';
import {NotificationService, TrackingFormBuilder, TrackingFormGroup} from 'mls-common-forms';
import {DialogContent} from 'mls-common-ui';

import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {UnitDataService} from '../../../services';

@Component({
  templateUrl: './unit-message-form.component.html'
})
export class UnitMessageFormComponent implements DialogContent<UnitMessageFormOptions> {

  readonly windowTitle: Observable<string>;
  readonly taskTitle: Observable<string>;
  readonly title: string;

  private readonly ids = new BehaviorSubject<number[]>([]);
  readonly units: Observable<UnitDto[]>;

  readonly form: TrackingFormGroup;

  constructor(private readonly unitService: UnitDataService, private readonly notificationService: NotificationService,
              private readonly translateService: TranslateService, private readonly dialog: MatDialogRef<any>, fb: TrackingFormBuilder) {
    this.form = fb.group({
      text: ['', Validators.required, null, true]
    });

    this.units = this.ids.pipe(
        switchMap(ids => combineLatest(ids.map(id => unitService.getById(id)))),
        map(units => units.filter((u): u is UnitDto => !!u)),
        shareReplay(1)
    );

    this.title = translateService.instant('unit.message.title');
    this.taskTitle = of(this.title);
    this.windowTitle = this.units.pipe(map(units => this.buildTitle(units)));
  }

  set data(data: UnitMessageFormOptions) {
    this.ids.next(data && data.units ? data.units : []);
  }

  private buildTitle(units: UnitDto[]): string {
    if (!units.length) {
      return this.title;
    }

    const unitsString = units.map(u => u.call).sort().join(', ');
    return `${this.title} – ${unitsString}`;
  }

  get saveDisabled(): boolean {
    return this.form.invalid || !this.ids.value.length;
  }

  save() {
    const data = {
      message: this.form.value.text || ''
    };

    combineLatest(this.ids.value.map(id => this.unitService.sendMessage(id, data)))
        .pipe(tap(_ => this.dialog.close()))
        .subscribe(this.notificationService.onError('alarm.send.error'));
  }
}

export interface UnitMessageFormOptions {
  units: number[];
}
