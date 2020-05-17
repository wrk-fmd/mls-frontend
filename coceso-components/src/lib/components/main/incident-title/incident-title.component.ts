import {Component, Input} from '@angular/core';
import {IncidentDto, IncidentTypeDto} from 'mls-coceso-api';

@Component({
  selector: 'coceso-main-incident-title',
  templateUrl: './incident-title.component.html'
})
export class IncidentTitleComponent {

  @Input() incident: IncidentDto;

  get title(): string {
    return this.incident.bo && this.incident.info;
  }

  get charForType(): string {
    if (this.incident.type === IncidentTypeDto.Task && this.incident.blue) {
      return 'TaskBlue';
    }
    return this.incident.type;
  }

  get showBo(): boolean {
    return !!this.incident.bo;
  }

  get showAo(): boolean {
    return !!this.incident.ao;
  }
}
