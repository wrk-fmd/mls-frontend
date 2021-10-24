import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Component, Input, Predicate} from '@angular/core';

import {IncidentDto, TaskDto} from 'mls-coceso-api';
import {NotificationService} from 'mls-common-forms';
import {WindowService} from 'mls-common-ui';

import {Observable, of} from 'rxjs';

import {IncidentHelper, TaskHelper, TimerData} from '../../../helpers';
import {IncidentWithUnits} from '../../../models';
import {TaskDataService} from '../../../services';

import {IncidentFormComponent} from '../incident-form/incident-form.component';

@Component({
  selector: 'coceso-main-incident-data',
  templateUrl: './incident-data.component.html',
  styleUrls: ['./incident-data.component.scss']
})
export class IncidentDataComponent {

  private _incident?: IncidentWithUnits;
  private _highlighted?: Predicate<IncidentDto>;

  typeChar: string | null = null;

  timer: Observable<TimerData | null> = of(null);

  isHighlighted: boolean = false;

  @Input()
  set highlighted(highlighted: Predicate<IncidentDto>) {
    this._highlighted = highlighted;
    this.isHighlighted = this.incident ? highlighted(this.incident) : false;
  }

  @Input()
  activePanels?: Set<number>;

  get expanded(): boolean {
    return !!this.id && !!this.activePanels && this.activePanels.has(this.id);
  }

  set expanded(value: boolean) {
    if (!this.id || !this.activePanels) {
      return;
    }

    if (value) {
      this.activePanels.add(this.id);
    } else {
      this.activePanels.delete(this.id);
    }
  }

  get incident(): IncidentWithUnits | undefined {
    return this._incident;
  }

  @Input()
  set incident(incident: IncidentWithUnits | undefined) {
    if (incident) {
      this._incident = incident;
      this.setIncident(incident);
    }
  }

  constructor(private readonly taskService: TaskDataService,
              private readonly incidentHelper: IncidentHelper, private readonly taskHelper: TaskHelper,
              private readonly notificationService: NotificationService, private readonly windowService: WindowService) {
  }

  private get id(): number | undefined {
    return this.incident?.id;
  }

  private setIncident(incident: IncidentDto) {
    this.typeChar = this.incidentHelper.shortType(incident);
    this.timer = this.incidentHelper.timer(incident);
    this.isHighlighted = this._highlighted ? this._highlighted(incident) : false;
  }

  dropUnit(event: CdkDragDrop<any>) {
    const unit = event.item.data;
    if (unit.type === 'unit' && unit.id && this.id) {
      this.taskService.assign(this.id, unit.id)
          .subscribe(this.notificationService.onError('unit.assign'));
    }
  }

  nextState(task: TaskDto): void {
    this.taskHelper.nextState(task);
  }

  openForm(): void {
    if (this.id) {
      this.windowService.open(IncidentFormComponent, {id: this.id});
    }
  }

  addJournalEntry(): void {
    // TODO
  }

  openJournal(): void {
    // TODO
  }
}
