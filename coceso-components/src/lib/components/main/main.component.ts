import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {ConcernDto, IncidentTypeDto} from 'mls-coceso-api';
import {ListOptions} from 'mls-common-data';
import {WindowService, WinmanComponent} from 'mls-common-ui';

import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import {IncidentHelper, UnitHelper} from '../../helpers';
import {IncidentWithUnits} from '../../models/incident-with-units';
import {UnitWithIncidents} from '../../models/unit-with-incidents';
import {ConcernDataService, TaskDataService} from '../../services';
import {
  IncidentFormComponent,
  IncidentListComponent,
  MessageListComponent,
  UnitHierarchyComponent,
  UnitListComponent,
  UnitListFilter
} from './main';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit, OnDestroy {

  @ViewChild(WinmanComponent)
  winmanComponent: WinmanComponent;

  private readonly sectionSubscription: Subscription;

  readonly concern: Observable<ConcernDto>;
  readonly sections: Observable<string[]>;
  activeSection: string = null;

  connected = false; // TODO
  readonly highlightedIncidents: Observable<string>;
  readonly highlightedTransports: Observable<string>;
  readonly alarmUnits: Observable<string>;
  readonly freeUnits: Observable<string>;

  constructor(private readonly concernService: ConcernDataService, taskService: TaskDataService,
              incidentHelper: IncidentHelper, unitHelper: UnitHelper,
              private readonly windowService: WindowService, private readonly snackBar: MatSnackBar) {
    this.concern = concernService.getActiveConcern();
    this.sections = this.concern.pipe(
        map(c => c && c.sections && c.sections.length ? c.sections.sort() : null)
    );

    this.sectionSubscription = concernService.getActiveSection().subscribe(s => this.activeSection = s);

    const highlightedIncidentsOptions = new ListOptions<IncidentWithUnits>().addFilters(i => incidentHelper.isHighlighted(i));
    this.highlightedIncidents = taskService.getIncidents(highlightedIncidentsOptions, false).pipe(
        map(data => data.length ? data.length.toString() : null)
    );

    const highlightedTransportOptions = new ListOptions<IncidentWithUnits>().addFilters(i => incidentHelper.isHighlightedTransport(i));
    this.highlightedTransports = taskService.getIncidents(highlightedTransportOptions, false).pipe(
        map(data => data.length ? data.length.toString() : null)
    );

    const alarmUnitsOptions = new ListOptions<UnitWithIncidents>().addFilters(u => unitHelper.hasAssigned(u));
    this.alarmUnits = taskService.getUnits(alarmUnitsOptions).pipe(
        map(data => data.length ? data.length.toString() : null)
    );

    const freeUnitsOptions = new ListOptions<UnitWithIncidents>().addFilters(u => unitHelper.isFree(u));
    this.freeUnits = taskService.getUnits(freeUnitsOptions).pipe(
        map(data => data.length ? data.length.toString() : null)
    );
  }

  ngAfterViewInit(): void {
    this.windowService.setComponent(this.winmanComponent);
    this.showUnitsHierarchy();
    this.showActiveTasks();
    this.showActivePositions();
  }

  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
  }

  showInfo(message: string) {
    if (message) {
      this.snackBar.open(message, 'Jo eh.', {
        panelClass: 'snackbar-multiline'
      });
    }
  }

  showUnits() {
    this.windowService.open(UnitListComponent);
  }

  showUnitsHierarchy() {
    this.windowService.open(UnitHierarchyComponent, null, {left: '0px', top: '0px'});
  }

  showUnitsAlarm() {
    this.windowService.open(UnitListComponent, {filter: UnitListFilter.ALARM}, {left: '0px', bottom: '0px'});
  }

  showUnitsAvailable() {
    this.windowService.open(UnitListComponent, {filter: UnitListFilter.AVAILABLE}, {left: '30%', bottom: '0px'});
  }

  showUnitsFree() {
    this.windowService.open(UnitListComponent, {filter: UnitListFilter.FREE}, {left: '15%', bottom: '0px'});
  }

  createIncident() {
    this.windowService.open(IncidentFormComponent, {type: IncidentTypeDto.Task, options: ['blue']});
  }

  createRelocation() {
    this.windowService.open(IncidentFormComponent, {type: IncidentTypeDto.Position});
  }

  showAllIncidents() {
    this.windowService.open(IncidentListComponent, {
      title: 'main.nav.incidents.showAll'
    }, {width: '460px', right: '460px', bottom: '0px'});
  }

  showActiveTasks() {
    this.windowService.open(IncidentListComponent, {
      title: 'main.nav.incidents.showActiveTasks',
      filter: {onlyActive: true, types: [IncidentTypeDto.Task, IncidentTypeDto.Transport]}
    }, {width: '460px', right: '0px', top: '0px'});
  }

  showActivePositions() {
    this.windowService.open(IncidentListComponent, {
      title: 'main.nav.incidents.showActivePositions',
      filter: {onlyActive: true, types: [IncidentTypeDto.Position]}
    }, {width: '460px', right: '0px', bottom: '0px'});
  }

  showHighlightedIncidents() {
    this.windowService.open(IncidentListComponent, {
      title: 'main.nav.incidents.showHighlightedIncidents',
      filter: {highlighted: true}
    }, {width: '460px', right: '460px', top: '0px'});
  }

  showDoneIncidents() {
    this.windowService.open(IncidentListComponent, {
      title: 'main.nav.incidents.showDone',
      filter: {onlyClosed: true}
    }, {width: '460px', right: '460px', top: '15%'});
  }

  showAllTransports() {
    this.windowService.open(IncidentListComponent, {
      title: 'main.nav.incidents.showAllTransports',
      filter: {types: [IncidentTypeDto.Transport]}
    }, {width: '460px', right: '0px', bottom: '0px'});
  }

  showHighlightedTransports() {
    this.windowService.open(IncidentListComponent, {
      title: 'main.nav.incidents.showHighlightedTransports',
      filter: {highlighted: true, types: [IncidentTypeDto.Transport]}
    }, {width: '460px', right: '0px', top: '15%'});
  }

  showCustomJournal() {
    // TODO
  }

  addJournalEntry() {
    // TODO
  }

  showPatients() {
    // TODO
  }

  showMessages() {
    this.windowService.open(MessageListComponent);
  }

  showJournal() {
    // TODO
  }

  setSection(section: string) {
    this.concernService.setActiveSection(section);
  }
}
