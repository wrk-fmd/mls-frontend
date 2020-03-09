import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {CommonComponentsModule} from 'mls-common';

import translationsDe from '../i18n/de';
import translationsEn from '../i18n/en';

import {CocesoRoutingModule} from './coceso-routing.module';
import {
  ConcernEditComponent,
  ConcernListComponent,
  ConcernOverviewComponent,
  EditComponent,
  IncidentDataComponent,
  IncidentFormComponent,
  IncidentListComponent,
  IncidentTitleComponent,
  MainComponent,
  UnitEditFormComponent,
  UnitEntryComponent,
  UnitListComponent,
  UnitsEditComponent,
  UnitTaskComponent
} from './components';
import {IncidentHelper} from './helpers';
import {ConcernDataService, IncidentDataService, UnitDataService} from './services';

const entryComponents = [
  IncidentFormComponent, IncidentListComponent, UnitListComponent
];

@NgModule({
  declarations: [
    ...entryComponents,
    ConcernListComponent, ConcernOverviewComponent,
    EditComponent, ConcernEditComponent, UnitsEditComponent, UnitEditFormComponent,
    MainComponent, IncidentTitleComponent, IncidentDataComponent, UnitEntryComponent, UnitTaskComponent
  ],
  imports: [
    // Angular
    CommonModule, ReactiveFormsModule,
    // Angular Material
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    // Translations
    TranslateModule.forChild(),
    // MLS modules
    CommonComponentsModule,
    CocesoRoutingModule
  ],
  providers: [
    IncidentHelper,
    ConcernDataService, IncidentDataService, UnitDataService
  ],
  entryComponents
})
export class CocesoComponentsModule {
  constructor(translate: TranslateService) {
    translate.setTranslation('en', translationsEn, true);
    translate.setTranslation('de', translationsDe, true);
  }
}
