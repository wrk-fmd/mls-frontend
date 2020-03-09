import {Component, Input, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';

import {IncidentDto, IncidentTypeDto, UnitDto, UnitEndpointService, UnitStateDto} from 'mls-coceso-api';

import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {IncidentDataService} from '../../../services/incident.data.service';

@Component({
  selector: 'coceso-main-unit',
  templateUrl: './unit-entry.component.html',
  styleUrls: ['./unit-entry.component.scss']
})
export class UnitEntryComponent {

  @Input() unit: UnitDto;

  @ViewChild(MatMenuTrigger)
  private unitMenu: MatMenuTrigger;

  readonly states = Object.values(UnitStateDto);

  constructor(private readonly unitService: UnitEndpointService, private readonly incidentService: IncidentDataService) {
  }

  openMenu(event: MouseEvent) {
    event.preventDefault();
    this.unitMenu.openMenu();
  }

  allowState(state: UnitStateDto): boolean {
    return this.unit.state !== state;
  }

  setState(state: UnitStateDto): void {
    this.unitService.updateUnit({
      concern: this.unit.concern,
      unit: this.unit.id,
      data: {state}
    }).subscribe(() => {
      // TODO
    });
  }

  showActions(): boolean {
    return this.unit.portable && (this.allowSendHome() || this.allowStandby() || this.allowHoldPosition());
  }

  allowSendHome(): boolean {
    // TODO
    return true;
  }

  sendHome(): void {
    this.unitService.sendHome({
      concern: this.unit.concern,
      unit: this.unit.id
    }).subscribe(() => {
      // TODO
    });
  }

  allowStandby(): boolean {
    // TODO
    return true;
  }

  setStandby() {
    this.unitService.standby({
      concern: this.unit.concern,
      unit: this.unit.id
    }).subscribe(() => {
      // TODO
    });
  }

  allowHoldPosition(): boolean {
    // TODO
    return true;
  }

  setHoldPosition() {
    this.unitService.holdPosition({
      concern: this.unit.concern,
      unit: this.unit.id
    }).subscribe(() => {
      // TODO
    });
  }

  allowSendCall(): boolean {
    // TODO
    return true;
  }

  sendCall(): void {
    // TODO
  }

  dropdownIncidents(): Observable<IncidentDto[]> {
    const tasks = this.unit.incidents || [];
    return combineLatest(tasks.map(t => this.incidentService.getById(t.incident))).pipe(
        map(incidents => incidents.filter(i => this.showInDropdown(i))),
        map(incidents => incidents.length > 0 ? incidents : null)
    );
  }

  private showInDropdown(incident: IncidentDto) {
    return incident && (
        incident.type === IncidentTypeDto.Task ||
        incident.type === IncidentTypeDto.Transport ||
        incident.type === IncidentTypeDto.Relocation
    );
  }

  createIncident(): void {
    // TODO
  }

  createRelocation(): void {
    // TODO
  }

  reportIncident(): void {
    // TODO
  }

  addJournalEntry(): void {
    // TODO
  }

  showDetails(): void {
    // TODO
  }

  editUnit(): void {
    // TODO
  }

  showJournal(): void {
    // TODO
  }

  stateCss() {
    switch (this.unit.state) {
      case UnitStateDto.READY:
        return this.isStandby() ? 'unit-state-standby' : 'unit-state-ready';
      case UnitStateDto.NOT_READY:
        return 'unit-state-not-ready';
      case UnitStateDto.OFF_DUTY:
        return 'unit-state-off-duty';
    }
  }

  private isStandby(): boolean {
    // TODO
    return false;
  }

  hasIncident(): boolean {
    return this.unit.incidents && this.unit.incidents.length > 0;
  }

  isFree(): boolean {
    return this.unit.portable && this.unit.state !== UnitStateDto.OFF_DUTY && !this.hasIncident() && !this.isHome();
  }

  isHome(): boolean {
    return this.unit.home && this.unit.position && this.unit.home.info === this.unit.position.info;
  }
}
