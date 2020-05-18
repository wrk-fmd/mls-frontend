import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';

import {TranslateModule, TranslateService} from '@ngx-translate/core';

import {CommonComponentsModule} from 'mls-common';

import translationsDe from '../i18n/de';
import translationsEn from '../i18n/en';

import {CocesoRoutingModule} from './coceso-routing.module';
import {
  ClockComponent,
  ConcernEditComponent,
  ConcernListComponent,
  ConcernOverviewComponent,
  ContainerEditChildComponent,
  ContainerEditRootComponent,
  ContainerEditUnitComponent,
  EditComponent,
  FormContactsComponent,
  FormCrewComponent,
  FormIncidentCloseComponent,
  FormPointComponent,
  FormSectionComponent,
  FormUnitTypeComponent,
  IncidentDataComponent,
  IncidentFormComponent,
  IncidentListComponent,
  IncidentTaskComponent,
  IncidentTitleComponent,
  MainComponent,
  UnitContainerComponent,
  UnitEditFormComponent,
  UnitEntryComponent,
  UnitFormComponent,
  UnitHierarchyComponent,
  UnitListComponent,
  UnitsEditComponent,
  UnitTaskComponent
} from './components';
import {IncidentHelper, TaskHelper} from './helpers';
import {ClockService, ConcernDataService, ContainerDataService, IncidentDataService, TaskService, UnitDataService} from './services';

@NgModule({
  declarations: [
    ConcernListComponent, ConcernOverviewComponent,
    FormContactsComponent, FormCrewComponent, FormIncidentCloseComponent, FormPointComponent, FormSectionComponent, FormUnitTypeComponent,
    EditComponent, ConcernEditComponent,
    UnitsEditComponent, UnitEditFormComponent,
    ContainerEditRootComponent, ContainerEditChildComponent, ContainerEditUnitComponent,
    MainComponent, ClockComponent,
    IncidentListComponent, IncidentTitleComponent, IncidentDataComponent, IncidentTaskComponent, IncidentFormComponent,
    UnitListComponent, UnitEntryComponent, UnitTaskComponent, UnitHierarchyComponent, UnitContainerComponent, UnitFormComponent
  ],
  imports: [
    // Angular
    CommonModule, ReactiveFormsModule,
    // Angular Material
    DragDropModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
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
    IncidentHelper, TaskHelper,
    ClockService, TaskService,
    ConcernDataService, IncidentDataService, UnitDataService, ContainerDataService
  ]
})
export class CocesoComponentsModule {
  constructor(translate: TranslateService) {
    translate.setTranslation('en', translationsEn, true);
    translate.setTranslation('de', translationsDe, true);
  }
}
