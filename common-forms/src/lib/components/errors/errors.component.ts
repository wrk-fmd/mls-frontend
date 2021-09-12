import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'mls-form-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class FormErrorsComponent {

  private readonly _control = new ReplaySubject<AbstractControl>(1);

  @Input()
  set control(value: AbstractControl | undefined) {
    if (value) {
      this._control.next(value);
    }
  }

  readonly errors: Observable<string[] | null>;

  constructor(private readonly translateService: TranslateService) {
    this.errors = this._control.pipe(switchMap(control => this.subscribeErrors(control)));
  }

  private subscribeErrors(control: AbstractControl): Observable<string[] | null> {
    return control ? control.statusChanges.pipe(map(() => this.buildErrors(control))) : of(null);
  }

  private buildErrors(control: AbstractControl): string[] | null {
    return control.errors ? Object.entries(control.errors).map(([error, params]) => this.getMessage(error, params)) : null;
  }

  private getMessage(type: string, params: any): string {
    const key = `validation.${type}`;
    let message = this.translateService.instant(key, params);
    if (message === key && params.message) {
      message = params.message;
    }
    return message;
  }
}
