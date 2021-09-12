import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';

import {IncidentTypeDto, TaskStateDto, UnitStateDto} from 'mls-coceso-api';
import {NotificationService} from 'mls-common-forms';
import {WindowService} from 'mls-common-ui';
import {Subscription} from 'rxjs';

import {DropdownIncident, IncidentHelper, UnitHelper} from '../../../helpers';
import {UnitWithIncidents} from '../../../models';
import {UnitDataService} from '../../../services';

import {IncidentFormComponent} from '../incident-form/incident-form.component';
import {UnitFormComponent} from '../unit-form/unit-form.component';
import {UnitMessageFormComponent} from '../unit-message-form/unit-message-form.component';

@Component({
  selector: 'coceso-main-unit',
  templateUrl: './unit-entry.component.html',
  styleUrls: ['./unit-entry.component.scss']
})
export class UnitEntryComponent implements OnDestroy {

  private _unit?: UnitWithIncidents;

  get unit(): UnitWithIncidents | undefined {
    return this._unit;
  }

  @Input()
  set unit(value: UnitWithIncidents | undefined) {
    this._unit = value;
    this.setUnit(value);
  }

  @ViewChild(MatMenuTrigger)
  private unitMenu?: MatMenuTrigger;

  @ViewChild(CdkDrag)
  private cdkDrag?: CdkDrag;

  @ViewChild(CdkDropList)
  set cdkDropList(list: CdkDropList) {
    if (this.dropListSubscription) {
      this.dropListSubscription.unsubscribe();
      this.dropListSubscription = undefined;
    }
    if (list) {
      this.dropListSubscription = list._dropListRef.beforeStarted.subscribe(() => this.fixDragPlaceholder());
    }
  }

  private dropListSubscription?: Subscription;

  states: UnitStateDto[] = [];
  stateCss: string | null = null;

  isFree: boolean = false;
  isHome: boolean = false;

  showActions: boolean = false;
  allowSendHome: boolean = false;
  allowStandby: boolean = false;
  allowHoldPosition: boolean = false;

  hasIncident: boolean = false;
  dropdownIncidents: DropdownIncident[] | null = null;

  constructor(private readonly unitService: UnitDataService,
              private readonly unitHelper: UnitHelper, private readonly incidentHelper: IncidentHelper,
              private readonly windowService: WindowService, private readonly notificationService: NotificationService) {
  }

  ngOnDestroy() {
    if (this.dropListSubscription) {
      this.dropListSubscription.unsubscribe();
    }
  }

  private fixDragPlaceholder() {
    // This is a workaround to keep the unit visible when dragging
    if (!this.cdkDrag) {
      return;
    }

    const placeholder = this.cdkDrag.getPlaceholderElement();
    const element = this.cdkDrag.getRootElement();
    if (placeholder && placeholder.parentNode && element) {
      // CdkDragDrop replaces the unit button with a placeholder - we move it back where it should be
      placeholder.parentNode.insertBefore(element, placeholder);
      element.style.display = 'block';
    }
  }

  private get id(): number | undefined {
    return this.unit?.id;
  }

  private setUnit(unit?: UnitWithIncidents) {
    // Compute everything only once when the unit is updated instead of at every change detection run
    this.states = unit ? Object.values(UnitStateDto).filter(state => state !== unit.state) : [];
    this.stateCss = this.unitHelper.stateCss(unit);

    this.isFree = this.unitHelper.isFree(unit);
    this.isHome = this.unitHelper.isHome(unit);

    this.allowSendHome = this.unitHelper.allowSendHome(unit);
    this.allowStandby = this.unitHelper.allowStandby(unit);
    this.allowHoldPosition = this.unitHelper.allowHoldPosition(unit);
    this.showActions = !!unit && unit.portable && (this.allowSendHome || this.allowStandby || this.allowHoldPosition);

    this.hasIncident = !!unit && unit.incidents && unit.incidents.length > 0;
    this.dropdownIncidents = unit ? this.incidentHelper.dropdownIncidents(unit.incidents) : null;
  }

  openMenu(event: MouseEvent) {
    event.preventDefault();
    if (this.unitMenu) {
      this.unitMenu.openMenu();
    }
  }

  setState(state: UnitStateDto): void {
    if (!this.id || !state) {
      return;
    }

    this.unitService.updateUnit(this.id, {state})
        .subscribe(this.notificationService.onError('unit.state.error'));
  }

  sendHome(): void {
    if (!this.id) {
      return;
    }

    this.unitService.sendHome(this.id)
        .subscribe(this.notificationService.onError('unit.actions.error'));
  }

  setStandby() {
    if (!this.id) {
      return;
    }

    this.unitService.standby(this.id)
        .subscribe(this.notificationService.onError('unit.actions.error'));
  }

  setHoldPosition() {
    if (!this.id) {
      return;
    }

    this.unitService.holdPosition(this.id)
        .subscribe(this.notificationService.onError('unit.actions.error'));
  }

  openMessageForm(): void {
    if (this.id) {
      this.windowService.open(UnitMessageFormComponent, {units: [this.id]});
    }
  }

  private createIncident(type: IncidentTypeDto) {
    if (!this.id) {
      return;
    }

    const data = {
      type,
      units: [{
        unit: this.id,
        state: TaskStateDto.Assigned
      }]
    };

    this.windowService.open(IncidentFormComponent, data);
  }

  createTask(): void {
    this.createIncident(IncidentTypeDto.Task);
  }

  createRelocation(): void {
    this.createIncident(IncidentTypeDto.Position);
  }

  reportIncident(): void {
    if (!this.unit || !this.id) {
      return;
    }

    const data = {
      caller: this.unit.call,
      bo: this.unit.portable && this.unit.position ? this.unit.position.info : '',
      type: IncidentTypeDto.Task,
      options: ['blue'],
      units: this.unit.portable ? [{
        unit: this.id,
        state: TaskStateDto.Abo
      }] : []
    };

    this.windowService.open(IncidentFormComponent, data);
  }

  addJournalEntry(): void {
    // TODO
  }

  editUnit(): void {
    if (this.id) {
      this.windowService.open(UnitFormComponent, {id: this.id});
    }
  }

  openIncident(id: number) {
    if (id) {
      this.windowService.open(IncidentFormComponent, {id});
    }
  }

  showJournal(): void {
    // TODO
  }
}
