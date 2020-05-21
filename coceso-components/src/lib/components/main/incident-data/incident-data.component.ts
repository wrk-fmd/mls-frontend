import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Component, Input} from '@angular/core';

import {IncidentDto} from 'mls-coceso-api';
import {NotificationService} from 'mls-common-forms';
import {WindowService} from 'mls-common-ui';

import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {IncidentHelper, TimerData} from '../../../helpers';
import {TaskService} from '../../../services';
import {IncidentFormComponent} from '../incident-form/incident-form.component';

@Component({
  selector: 'coceso-main-incident-data',
  templateUrl: './incident-data.component.html',
  styleUrls: ['./incident-data.component.scss']
})
export class IncidentDataComponent {

  readonly _incident = new BehaviorSubject<IncidentDto>(null);

  readonly title: Observable<string>;
  readonly subtitle: Observable<string>;
  readonly typeChar: Observable<string>;

  readonly timer: Observable<TimerData>;

  readonly showBo: Observable<boolean>;
  readonly showAo: Observable<boolean>;

  @Input()
  activePanels: Set<number>;

  get expanded(): boolean {
    const id = this.currentId();
    return id && this.activePanels && this.activePanels.has(id);
  }

  set expanded(value: boolean) {
    const id = this.currentId();
    if (!id || !this.activePanels) {
      return;
    }

    if (value) {
      this.activePanels.add(id);
    } else {
      this.activePanels.delete(id);
    }
  }

  @Input()
  set incident(incident: IncidentDto) {
    this._incident.next(incident);
  }

  constructor(private readonly taskService: TaskService, incidentHelper: IncidentHelper,
              private readonly notificationService: NotificationService, private readonly windowService: WindowService) {
    this.title = this._incident.pipe(map(i => incidentHelper.shortTitle(i)));
    this.subtitle = this._incident.pipe(map(i => incidentHelper.subtitle(i)));
    this.typeChar = this._incident.pipe(map(i => incidentHelper.shortType(i)));

    this.timer = this._incident.pipe(switchMap(i => incidentHelper.timer(i)));

    this.showBo = this._incident.pipe(map(i => i && !incidentHelper.pointEmpty(i.bo)));
    this.showAo = this._incident.pipe(map(i => i && !incidentHelper.pointEmpty(i.ao)));
  }

  private currentId(): number {
    return this._incident.value ? this._incident.value.id : null;
  }

  dropUnit(event: CdkDragDrop<any>) {
    const unit = event.item.data;
    const incidentId = this.currentId();
    if (unit.type === 'unit' && unit.id && incidentId) {
      this.taskService.assign(incidentId, unit.id)
          .subscribe(this.notificationService.onError('unit.assign'));
    }
  }

  openForm(): void {
    const id = this.currentId();
    if (id) {
      this.windowService.open(IncidentFormComponent, {id});
    }
  }

  addJournalEntry(): void {
    // TODO
  }

  openJournal(): void {
    // TODO
  }
}
