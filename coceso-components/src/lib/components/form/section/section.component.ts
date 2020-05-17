import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormBaseComponent} from 'mls-common';
import {Observable} from 'rxjs';
import {ConcernDataService} from '../../../services/concern.data.service';

@Component({
  selector: 'coceso-form-section',
  templateUrl: './section.component.html'
})
export class FormSectionComponent extends FormBaseComponent<FormControl> {

  readonly sections: Observable<string[]>;

  constructor(concernService: ConcernDataService) {
    super();
    this.sections = concernService.getSections();
  }
}
