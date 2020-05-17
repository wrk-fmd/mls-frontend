import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IncidentDto, IncidentTypeDto, PointDto, TaskDto, TaskStateDto} from 'mls-coceso-api';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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

  shortTitle(incident: IncidentDto) {
    if (!incident) {
      return null;
    }

    if (this.isTaskOrTransport(incident)) {
      return this.pointEmpty(incident.bo) ? this.translateService.instant('incident.boMissing') : this.trimPoint(incident.bo);
    }
    if (incident.type === IncidentTypeDto.Position) {
      return this.pointEmpty(incident.ao) ? this.translateService.instant('incident.aoMissing') : this.trimPoint(incident.ao);
    }
    return null;
  }

  subtitle(incident: IncidentDto) {
    return this.isTaskOrTransport(incident) && !this.pointEmpty(incident.ao) ? this.trimPoint(incident.ao) : null;
  }

  fullTitle(incident: IncidentDto) {
    if (!incident) {
      return null;
    }

    const title = this.shortTitle(incident);
    const type = this.translateService.instant(`incident.type.short.${this.shortType(incident)}`);
    return title ? `${type}: ${title}` : type;
  }

  isTaskOrTransport(incident: IncidentDto): boolean {
    return incident ? incident.type === IncidentTypeDto.Task || incident.type === IncidentTypeDto.Transport : false;
  }

  isRelocation(task: TaskDto, incident: IncidentDto): boolean {
    return incident ? incident.type === IncidentTypeDto.Position && task.state !== TaskStateDto.AAO : false;
  }

  isHoldPosition(task: TaskDto, incident: IncidentDto): boolean {
    return incident ? incident.type === IncidentTypeDto.Position && task.state === TaskStateDto.AAO : false;
  }

  pointEmpty(point: PointDto) {
    return !point || !point.info;
  }

  trimPoint(point: PointDto) {
    return point.info.split('\n')[0];
  }

  timer(incident: IncidentDto): Observable<TimerData> {
    if (!incident || incident.closed) {
      return null;
    }

    return this.clockService.elapsedMinutes(incident.stateChange).pipe(map(elapsed => this.timerData(incident, elapsed)));
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
