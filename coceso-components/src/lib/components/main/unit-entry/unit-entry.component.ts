import {CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {Component, Input, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';

import {IncidentDto, IncidentTypeDto, UnitDto, UnitStateDto} from 'mls-coceso-api';
import {NotificationService, WindowService} from 'mls-common';

import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DropListService} from '../../../services/drop-list.service';

import {IncidentDataService} from '../../../services/incident.data.service';
import {UnitDataService} from '../../../services/unit.data.service';
import {UnitFormComponent} from '../unit-form/unit-form.component';

@Component({
  selector: 'coceso-main-unit',
  templateUrl: './unit-entry.component.html',
  styleUrls: ['./unit-entry.component.scss']
})
export class UnitEntryComponent {

  private _unit: UnitDto;

  get unit(): UnitDto {
    return this._unit;
  }

  @Input()
  set unit(value: UnitDto) {
    this.setUnit(value);
  }

  @ViewChild(MatMenuTrigger)
  private unitMenu: MatMenuTrigger;

  states: UnitStateDto[];
  stateCss: string;

  readonly incidentDropLists: Observable<CdkDropList[]>;

  constructor(private readonly unitService: UnitDataService, private readonly incidentService: IncidentDataService,
              private readonly windowService: WindowService, private readonly notificationService: NotificationService,
              dropListService: DropListService) {
    this.incidentDropLists = dropListService.getLists('incidents');
  }

  private currentId(): number {
    return this.unit ? this.unit.id : null;
  }

  private setUnit(unit: UnitDto) {
    this._unit = unit;
    this.states = Object.values(UnitStateDto).filter(state => state !== unit.state);
    this.stateCss = this.buildStateCss(unit);
  }

  private buildStateCss(unit: UnitDto): string {
    switch (unit.state) {
      case UnitStateDto.READY:
        return this.isStandby() ? 'unit-task-Standby' : 'unit-state-ready';
      case UnitStateDto.NOT_READY:
        return 'unit-state-not-ready';
      case UnitStateDto.OFF_DUTY:
        return 'unit-state-off-duty';
    }
  }

  openMenu(event: MouseEvent) {
    event.preventDefault();
    this.unitMenu.openMenu();
  }

  setState(state: UnitStateDto): void {
    const id = this.currentId();
    if (!id) {
      return;
    }

    this.unitService.updateUnit(id, {state})
        .subscribe(this.notificationService.onError('unit.state.error'));
  }

  showActions(): boolean {
    return this._unit.portable && (this.allowSendHome() || this.allowStandby() || this.allowHoldPosition());
  }

  allowSendHome(): boolean {
    // TODO
    return true;
  }

  sendHome(): void {
    const id = this.currentId();
    if (!id) {
      return;
    }

    this.unitService.sendHome(id)
        .subscribe(this.notificationService.onError('unit.actions.error'));
  }

  allowStandby(): boolean {
    // TODO
    return true;
  }

  setStandby() {
    const id = this.currentId();
    if (!id) {
      return;
    }

    this.unitService.standby(id)
        .subscribe(this.notificationService.onError('unit.actions.error'));
  }

  allowHoldPosition(): boolean {
    // TODO
    return true;
  }

  setHoldPosition() {
    const id = this.currentId();
    if (!id) {
      return;
    }

    this.unitService.holdPosition(id)
        .subscribe(this.notificationService.onError('unit.actions.error'));
  }

  allowSendCall(): boolean {
    // TODO
    return true;
  }

  sendCall(): void {
    // TODO
  }

  dropdownIncidents(): Observable<IncidentDto[]> {
    const tasks = this._unit.incidents || [];
    return combineLatest(tasks.map(t => this.incidentService.getById(t.incident))).pipe(
        map(incidents => incidents.filter(i => this.showInDropdown(i))),
        map(incidents => incidents.length > 0 ? incidents : null)
    );
  }

  private showInDropdown(incident: IncidentDto) {
    return incident && (
        incident.type === IncidentTypeDto.Task ||
        incident.type === IncidentTypeDto.Transport ||
        incident.type === IncidentTypeDto.Position
    );
  }

  dropped(event: CdkDragDrop<any>): void {
    console.log(event);
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
    const id = this.currentId();
    if (id) {
      this.windowService.open(UnitFormComponent, {id});
    }
  }

  showJournal(): void {
    // TODO
  }

  private isStandby(): boolean {
    // TODO
    return false;
  }

  hasIncident(): boolean {
    return this._unit.incidents && this._unit.incidents.length > 0;
  }

  isFree(): boolean {
    return this._unit.portable && this._unit.state !== UnitStateDto.OFF_DUTY && !this.hasIncident() && !this.isHome();
  }

  isHome(): boolean {
    return this._unit.home && this._unit.position && this._unit.home.info === this._unit.position.info;
  }
}
