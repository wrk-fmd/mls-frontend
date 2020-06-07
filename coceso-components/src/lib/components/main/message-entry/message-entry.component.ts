import {Component, Input} from '@angular/core';
import {TaskDto} from 'mls-coceso-api';
import {WindowService} from 'mls-common-ui';
import {Observable, of, ReplaySubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {IncidentHelper, TaskHelper} from '../../../helpers';
import {ClockService, CombinedMessage} from '../../../services';
import {UnitFormComponent} from '../unit-form/unit-form.component';

@Component({
  selector: 'coceso-main-message-entry',
  templateUrl: './message-entry.component.html',
  styleUrls: ['./message-entry.component.scss']
})
export class MessageEntryComponent {

  @Input()
  activePanels: Set<number>;

  get expanded(): boolean {
    return this.isLast || (this.data && this.activePanels && !!this.data.messages.find(m => this.activePanels.has(m.id)));
  }

  set expanded(value: boolean) {
    if (!this.data || !this.activePanels) {
      return;
    }
    this.data.messages.forEach(m => value ? this.activePanels.add(m.id) : this.activePanels.delete(m.id));
  }

  private _data: CombinedMessage;

  @Input()
  set data(value: CombinedMessage) {
    this._data = value;
    this.emergency = !!value.messages.find(m => m.emergency);
    this.timestamp.next(value.messages[0].timestamp);
    this.setIncidents(value);
  }

  get data(): CombinedMessage {
    return this._data;
  }

  @Input()
  isLast = false;

  emergency: boolean;
  incidents: MessageTask[] = [];

  readonly timestamp = new ReplaySubject<number>(1);
  readonly timer: Observable<number>;

  constructor(private readonly incidentHelper: IncidentHelper, private readonly taskHelper: TaskHelper,
              clockService: ClockService, private readonly windowService: WindowService) {
    this.timer = this.timestamp.pipe(
        switchMap(timestamp => timestamp ? clockService.elapsedSeconds(timestamp) : of(null))
    );
  }

  private setIncidents(message: CombinedMessage) {
    this.incidents = message && message.unit ? message.unit.incidents.map(task => ({
      ...task,
      title: this.incidentHelper.title(task.incidentData)
    })) : [];
  }

  nextState(task: TaskDto): void {
    this.taskHelper.nextState(task);
  }

  openDetails(id): void {
    if (id) {
      this.windowService.open(UnitFormComponent, {id});
    }
  }
}

interface MessageTask extends TaskDto {
  title: string;
}
