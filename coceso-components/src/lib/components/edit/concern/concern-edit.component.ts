import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ConcernDto} from 'mls-coceso-api';
import {TrackingFormBuilder, TrackingFormControl} from 'mls-common';

import {ConcernDataService} from '../../../services/concern.data.service';

@Component({
  selector: 'mls-concern-edit',
  templateUrl: './concern-edit.component.html',
  styleUrls: ['./concern-edit.component.scss']
})
export class ConcernEditComponent {

  readonly form: FormGroup;
  readonly sectionForm: FormControl;
  sections: string[];

  private loading: boolean;

  constructor(private readonly concernService: ConcernDataService, fb: TrackingFormBuilder) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      info: ['']
    });
    this.sectionForm = fb.control('', [Validators.required, Validators.maxLength(30)]);

    this.concernService.getActiveConcern().subscribe(concern => this.setData(concern));
  }

  private setData(concern: ConcernDto) {
    concern = concern || {};

    (this.form.controls.name as TrackingFormControl).setServerValue(concern.name || '');
    (this.form.controls.info as TrackingFormControl).setServerValue(concern.info || '');

    this.sections = concern.sections ? concern.sections.sort() : [];
  }

  get saveDisabled(): boolean {
    return this.loading || this.form.invalid || this.form.pristine;
  }

  save() {
    this.loading = true;
    const data = {
      name: this.form.value.name,
      info: this.form.value.info
    };
    this.concernService.updateConcern(data).subscribe(
        () => {
          this.loading = false;
        },
        error => {
          this.loading = false;
          // TODO
          console.log(error);
        }
    );
  }

  addSection(section: string) {
    if (!this.sectionForm.valid || this.loading) {
      return;
    }

    this.loading = true;
    const data = {
      name: section
    };

    this.concernService.addSection(data).subscribe(
        () => {
          this.loading = false;
          this.sectionForm.reset();
        },
        error => {
          this.loading = false;
          // TODO
          console.log(error);
        }
    );
  }

  removeSection(section: string) {
    this.loading = true;
    this.concernService.removeSection(section).subscribe(
        () => {
          this.loading = false;
        },
        error => {
          this.loading = false;
          // TODO
          console.log(error);
        }
    );
  }
}
