import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IncidentDto, IncidentTypeDto, PointDto} from 'mls-coceso-api';

@Injectable()
export class IncidentHelper {

  constructor(private readonly translateService: TranslateService) {
  }

  shortType(incident: IncidentDto): string {
    if (incident.type === IncidentTypeDto.Task && incident.blue) {
      return 'TaskBlue';
    }
    return incident.type;
  }

  shortTitle(incident: IncidentDto) {
    if (this.isTaskOrTransport(incident)) {
      return this.pointEmpty(incident.bo) ? this.translateService.instant('incident.boMissing') : this.trimPoint(incident.bo);
    }
    if (incident.type === IncidentTypeDto.Relocation) {
      return this.pointEmpty(incident.ao) ? this.translateService.instant('incident.aoMissing') : this.trimPoint(incident.ao);
    }
    return null;
  }

  fullTitle(incident: IncidentDto) {
    const title = this.shortTitle(incident);
    const type = this.translateService.instant(`incident.type.short.${this.shortType(incident)}`);
    return title ? `${type}: ${title}` : type;
  }

  isTaskOrTransport(incident: IncidentDto) {
    return incident.type === IncidentTypeDto.Task || incident.type === IncidentTypeDto.Transport;
  }

  pointEmpty(point: PointDto) {
    return !point || !point.info;
  }

  trimPoint(point: PointDto) {
    return point.info.split('\n')[0];
  }

}
