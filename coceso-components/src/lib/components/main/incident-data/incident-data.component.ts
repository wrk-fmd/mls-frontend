import {Component, Input, OnInit} from '@angular/core';
import {IncidentDto, TaskDto} from 'mls-coceso-api';
import {WindowService} from 'mls-common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UnitDataService} from '../../../services/unit.data.service';
import {IncidentFormComponent} from '../incident-form/incident-form.component';

@Component({
  selector: 'coceso-main-incident-data',
  templateUrl: './incident-data.component.html',
  styleUrls: ['./incident-data.component.scss']
})
export class IncidentDataComponent implements OnInit {

  @Input() incident: IncidentDto;

  constructor(private readonly unitService: UnitDataService, private readonly windowService: WindowService) {
  }

  ngOnInit() {
  }

  showBo(): boolean {
    return !!this.incident.bo;
  }

  showAo(): boolean {
    return !!this.incident.ao;
  }

  unitCall(task: TaskDto): Observable<string> {
    return this.unitService.getById(task.unit).pipe(map(u => u ? u.call : ''));
  }

  nextState(task: TaskDto): void {
    // TODO
  }

  openForm(): void {
    this.windowService.open(IncidentFormComponent, {id: this.incident.id});
  }

  addJournalEntry(): void {
    // TODO
  }

  openJournal(): void {
    // TODO
  }
}
