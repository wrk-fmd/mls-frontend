import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IncidentDto, IncidentTypeDto, PointDto, TaskDto, TaskStateDto} from 'mls-coceso-api';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {TaskWithIncident} from '../models/unit-with-incidents';
import {ClockService} from '../services/clock.service';

@Injectable()
export class IncidentHelper {

  constructor(private readonly translateService: TranslateService, private readonly clockService: ClockService) {
  }

  shortType(incident: IncidentDto): string {
    if (!incident) {
      return null;
    }

    if (incident.type === IncidentTypeDto.Task && incident.blue) {
      return 'TaskBlue';
    }
    return incident.type;
  }

  shortBo(incident: IncidentDto) {
    return incident && !this.pointEmpty(incident.bo)
        ? this.trimPoint(incident.bo)
        : this.translateService.instant('incident.boMissing');
  }

  shortAo(incident: IncidentDto) {
    return this.isTaskOrTransport(incident) && !this.pointEmpty(incident.ao) ? this.trimPoint(incident.ao) : null;
  }

  title(incident: IncidentDto) {
    if (!incident) {
      return null;
    }

    const bo = this.shortBo(incident);
    const type = this.translateService.instant(`incident.type.short.${this.shortType(incident)}`);
    return bo ? `${type}: ${bo}` : type;
  }

  dropdownIncidents(incidents: TaskWithIncident[]): DropdownIncident[] {
    if (!incidents) {
      return null;
    }

    const dropdownIncidents = incidents.filter(t => this.showInDropdown(t)).map(t => ({
      id: t.incident,
      title: this.title(t.incidentData)
    }));
    return dropdownIncidents.length ? dropdownIncidents : null;
  }

  private showInDropdown(task: TaskWithIncident): boolean {
    return task && task.incidentData &&
        task.incidentData.type !== IncidentTypeDto.ToHome && task.incidentData.type !== IncidentTypeDto.Standby;
  }

  isHighlighted(incident: IncidentDto): boolean {
    if (!incident || incident.closed) {
      return false;
    }

    // TODO This needs to consider required unit types when implemented
    return !incident.units || !incident.units.length;
  }

  isHighlightedTransport(incident: IncidentDto): boolean {
    if (!incident || incident.closed || incident.type !== IncidentTypeDto.Transport) {
      return false;
    }

    return this.pointEmpty(incident.ao) || !this.hasCasusNr(incident);
  }

  hasCasusNr(incident: IncidentDto): boolean {
    return incident && incident.casusNr && !!incident.casusNr.trim();
  }

  isTaskOrTransport(incident: Partial<IncidentDto>): boolean {
    return incident ? incident.type === IncidentTypeDto.Task || incident.type === IncidentTypeDto.Transport : false;
  }

  isRelocation(task: TaskDto, incident: IncidentDto): boolean {
    return incident ? incident.type === IncidentTypeDto.Position && task.state !== TaskStateDto.Abo : false;
  }

  isHoldPosition(task: TaskDto, incident: IncidentDto): boolean {
    return incident ? incident.type === IncidentTypeDto.Position && task.state === TaskStateDto.Abo : false;
  }

  pointEmpty(point: PointDto) {
    return !point || !point.info;
  }

  trimPoint(point: PointDto) {
    return point.info.split('\n')[0];
  }

  timer(incident: IncidentDto): Observable<TimerData> {
    if (!incident || incident.closed) {
      return of(null);
    }

    return this.clockService.elapsedMinutes(incident.arrival ? incident.stateChange : incident.created)
        .pipe(map(elapsed => this.timerData(incident, elapsed)));
  }

  private timerData(incident: IncidentDto, elapsed: number): TimerData {
    let css = '';

    if (incident.arrival) {
      if (elapsed >= 35) {
        css = 'timer-danger';
      } else if (elapsed >= 25) {
        css = 'timer-warning';
      }
    } else {
      if (elapsed >= 15) {
        css = 'timer-danger';
      } else if (elapsed >= 10) {
        css = 'timer-warning';
      }
    }

    return {elapsed, css};
  }
}

export interface TimerData {
  elapsed: number;
  css: string;
}

export interface DropdownIncident {
  id: number;
  title: string;
}
