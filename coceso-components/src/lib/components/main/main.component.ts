import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {WindowService, WinmanComponent} from 'mls-common-ui';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConcernDataService} from '../../services';
import {IncidentFormComponent, IncidentListComponent, UnitHierarchyComponent, UnitListComponent} from './main';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit, OnDestroy {

  @ViewChild(WinmanComponent)
  winmanComponent: WinmanComponent;

  private readonly sectionSubscription: Subscription;

  readonly sections: Observable<string[]>;
  activeSection: string = null;

  constructor(private readonly concernService: ConcernDataService, private readonly windowService: WindowService) {
    this.sections = concernService.getActiveConcern().pipe(
        map(c => c && c.sections && c.sections.length ? c.sections.sort() : null)
    );

    this.sectionSubscription = concernService.getActiveSection().subscribe(s => this.activeSection = s);
  }

  ngAfterViewInit(): void {
    this.windowService.setComponent(this.winmanComponent);
    this.showUnitsHierarchy();
    this.showActiveIncidents();
  }

  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
  }

  showUnits() {
    this.windowService.open(UnitListComponent);
  }

  showUnitsHierarchy() {
    this.windowService.open(UnitHierarchyComponent, null, {left: '0px', top: '0px'});
  }

  showUnitsAlarm() {
    // TODO
  }

  showUnitsAvailable() {
    // TODO
  }

  showUnitsFree() {
    // TODO
  }

  createIncident() {
    this.windowService.open(IncidentFormComponent, {type: 'Task'});
  }

  createRelocation() {
    this.windowService.open(IncidentFormComponent, {type: 'Position'});
  }

  showAllIncidents() {
    // TODO
  }

  showActiveIncidents() {
    this.windowService.open(IncidentListComponent, null, {left: '70%', top: '0px'});
  }

  showDoneIncidents() {
    // TODO
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

  showRadioCalls() {
    // TODO
  }

  showJournal() {
    // TODO
  }

  setSection(section: string) {
    this.concernService.setActiveSection(section);
  }
}
