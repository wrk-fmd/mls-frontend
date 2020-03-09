import {Component, Input, OnInit} from '@angular/core';
import {IncidentDto, IncidentTypeDto} from 'mls-coceso-api';

@Component({
  selector: 'coceso-main-incident-title',
  templateUrl: './incident-title.component.html',
  styleUrls: ['./incident-title.component.scss']
})
export class IncidentTitleComponent implements OnInit {

  @Input() incident: IncidentDto;

  constructor() {
  }

  ngOnInit() {
  }

  title(): string {
    return this.incident.bo && this.incident.info;
  }

  charForType(): string {
    if (this.incident.type === IncidentTypeDto.Task && this.incident.blue) {
      return 'TaskBlue';
    }
    return this.incident.type;
  }

  showBo(): boolean {
    return !!this.incident.bo;
  }

  showAo(): boolean {
    return !!this.incident.ao;
  }
}
