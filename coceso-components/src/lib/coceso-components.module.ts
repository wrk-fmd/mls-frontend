import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {Inject, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
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
import {MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import {CommonFormsModule} from 'mls-common-forms';
import {CommonI18nModule, TRANSLATE_REGISTRAR, Translations} from 'mls-common-i18n';
import {CommonUiModule} from 'mls-common-ui';

import i18n from '../i18n';

import {CocesoRoutingModule} from './coceso-routing.module';

import {
  ClockComponent,
  ConcernEditComponent,
  ConcernListComponent,
  ConcernOverviewComponent,
  ContactComponent,
  ContainerEditChildComponent,
  ContainerEditRootComponent,
  ContainerEditUnitComponent,
  EditComponent,
  FormContactsComponent,
  FormCrewComponent,
  FormIncidentCloseComponent,
  FormPointComponent,
  FormPointInputComponent,
  FormSectionComponent,
  FormUnitTypeComponent,
  IncidentDataComponent,
  IncidentFormComponent,
  IncidentFormTaskComponent,
  IncidentListComponent,
  IncidentMessageFormComponent,
  MainComponent,
  MessageEntryComponent,
  MessageListComponent,
  PointAutocompleteTriggerDirective,
  StaffEditFormComponent,
  StaffIdFormComponent,
  StaffListComponent,
  TaskDialogComponent,
  UnitContainerComponent,
  UnitEditFormComponent,
  UnitEntryComponent,
  UnitFormComponent,
  UnitHierarchyComponent,
  UnitListComponent,
  UnitMessageFormComponent,
  UnitsEditComponent,
  UnitTaskComponent
} from './components';

import {ContentEditableDirective} from './directives';
import {IncidentHelper, PointHelper, StaffHelper, TaskHelper, UnitHelper} from './helpers';
import {PointPipe, StaffIdPipe, StaffNamePipe} from './pipes';

import {
  ClockService,
  ConcernDataService,
  ContainerDataService,
  IncidentDataService,
  MessageDataService,
  StaffDataService,
  TaskDataService,
  UnitDataService
} from './services';

@NgModule({
  declarations: [
    ConcernListComponent, ConcernOverviewComponent,
    StaffListComponent, StaffEditFormComponent, StaffIdFormComponent, StaffNamePipe, StaffIdPipe,
    FormContactsComponent, FormCrewComponent, FormIncidentCloseComponent, FormSectionComponent, FormUnitTypeComponent,
    FormPointComponent, FormPointInputComponent, PointPipe, ContentEditableDirective, PointAutocompleteTriggerDirective,
    EditComponent, ConcernEditComponent,
    UnitsEditComponent, UnitEditFormComponent,
    ContainerEditRootComponent, ContainerEditChildComponent, ContainerEditUnitComponent,
    MainComponent, ClockComponent, ContactComponent, TaskDialogComponent,
    IncidentListComponent, IncidentDataComponent, IncidentFormComponent, IncidentFormTaskComponent, IncidentMessageFormComponent,
    UnitListComponent, UnitEntryComponent, UnitTaskComponent, UnitHierarchyComponent, UnitContainerComponent,
    UnitFormComponent, UnitMessageFormComponent,
    MessageListComponent, MessageEntryComponent
  ],
  imports: [
    // Angular
    CommonModule, ReactiveFormsModule,
    // Angular Material
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
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
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    // MLS modules
    CommonFormsModule,
    CommonI18nModule,
    CommonUiModule,
    CocesoRoutingModule
  ],
  providers: [
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {formFieldAppearance: 'standard'}
    },
    IncidentHelper, UnitHelper, TaskHelper, StaffHelper, PointHelper,
    ClockService,
    ConcernDataService, IncidentDataService, UnitDataService, ContainerDataService, TaskDataService, MessageDataService, StaffDataService
  ]
})
export class CocesoComponentsModule {
  constructor(@Inject(TRANSLATE_REGISTRAR) registerTranslations: (translations: Translations) => void) {
    registerTranslations(i18n);
  }
}
