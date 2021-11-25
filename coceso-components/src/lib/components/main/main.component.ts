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
  winmanComponent?: WinmanComponent;

  private readonly sectionSubscription: Subscription;

  readonly concern: Observable<ConcernDto | undefined>;
  readonly sections: Observable<string[] | null>;
  activeSection: string | null = null;

  connected = false; // TODO
  readonly highlightedIncidents: Observable<string | null>;
  readonly highlightedTransports: Observable<string | null>;
  readonly alarmUnits: Observable<string | null>;
  readonly waitingUnits: Observable<string | null>;

  private areaSize = 0;

  constructor(private readonly concernService: ConcernDataService, taskService: TaskDataService,
              incidentHelper: IncidentHelper, unitHelper: UnitHelper,
              private readonly windowService: WindowService, private readonly snackBar: MatSnackBar) {
    this.concern = concernService.getActiveConcern();
    this.sections = concernService.getSections();

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

    const waitingUnitsOptions = new ListOptions<UnitWithIncidents>().addFilters(u => unitHelper.isWaiting(u));
    this.waitingUnits = taskService.getUnits(waitingUnitsOptions).pipe(
        map(data => data.length ? data.length.toString() : null)
    );
  }

  ngAfterViewInit(): void {
    this.windowService.setComponent(this.winmanComponent!);
    this.winmanComponent!.setSize(this.areaSize);
    this.showUnitsHierarchy();
    this.showActiveTasks();
    this.showActivePositions();
  }

  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
  }

  showInfo(message?: string) {
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

  showUnitsWaiting() {
    this.windowService.open(UnitListComponent, {filter: UnitListFilter.WAITING}, {left: '15%', bottom: '0px'});
  }

  createIncident() {
    this.windowService.open(IncidentFormComponent, {type: IncidentTypeDto.Task, options: ['blue']});
  }

  createPosition() {
    this.windowService.open(IncidentFormComponent, {type: IncidentTypeDto.Position});
  }

  showAllIncidents() {
    this.windowService.open(IncidentListComponent, {
      title: 'incident.views.all'
    }, {width: '460px', right: '460px', bottom: '0px'});
  }

  showActiveTasks() {
    this.windowService.open(IncidentListComponent, {
      title: 'incident.views.activeTasks',
      filter: {onlyActive: true, types: [IncidentTypeDto.Task, IncidentTypeDto.Transport]}
    }, {width: '460px', right: '0px', top: '0px'});
  }

  showActivePositions() {
    this.windowService.open(IncidentListComponent, {
      title: 'incident.views.activePositions',
      filter: {onlyActive: true, types: [IncidentTypeDto.Position]}
    }, {width: '460px', right: '0px', bottom: '0px'});
  }

  showHighlightedIncidents() {
    this.windowService.open(IncidentListComponent, {
      title: 'incident.views.highlightedIncidents',
      filter: {highlighted: true}
    }, {width: '460px', right: '460px', top: '0px'});
  }

  showDoneIncidents() {
    this.windowService.open(IncidentListComponent, {
      title: 'incident.views.done',
      filter: {onlyClosed: true}
    }, {width: '460px', right: '460px', top: '15%'});
  }

  showAllTransports() {
    this.windowService.open(IncidentListComponent, {
      title: 'incident.views.allTransports',
      filter: {types: [IncidentTypeDto.Transport]}
    }, {width: '460px', right: '0px', bottom: '0px'});
  }

  showHighlightedTransports() {
    this.windowService.open(IncidentListComponent, {
      title: 'incident.views.highlightedTransports',
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

  setSection(section: string | null) {
    this.concernService.setActiveSection(section);
  }

  increaseArea() {
    this.areaSize++;
    if (this.winmanComponent) {
      this.winmanComponent.setSize(this.areaSize);
    }
  }

  resetArea() {
    this.areaSize = 0;
    if (this.winmanComponent) {
      this.winmanComponent.setSize(this.areaSize);
    }
  }
}
