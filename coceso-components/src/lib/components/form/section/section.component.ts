import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormBaseComponent} from 'mls-common-forms';
import {Observable} from 'rxjs';
import {ConcernDataService} from '../../../services';

@Component({
  selector: 'coceso-form-section',
  templateUrl: './section.component.html'
})
export class FormSectionComponent extends FormBaseComponent<FormControl> {

  readonly sections: Observable<string[] | null>;

  constructor(concernService: ConcernDataService) {
    super();
    this.sections = concernService.getSections();
  }
}
