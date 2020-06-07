import {Injectable} from '@angular/core';
import {IncidentTypeDto, PointDto, TaskStateDto, UnitDto, UnitStateDto} from 'mls-coceso-api';
import {TaskWithIncident, UnitWithIncidents} from '../models/unit-with-incidents';

@Injectable()
export class UnitHelper {

  private pointNotEmpty(point: PointDto): boolean {
    return point && !!point.info;
  }

  hasHome(unit: UnitDto): boolean {
    return unit && this.pointNotEmpty(unit.home);
  }

  isHome(unit: UnitDto): boolean {
    return this.hasHome(unit) && unit.position && unit.position.info === unit.home.info;
  }

  hasAssigned(unit: UnitDto): boolean {
    return unit && unit.incidents && !!unit.incidents.find(t => t.state === TaskStateDto.Assigned);
  }

  isFree(unit: UnitDto): boolean {
    return unit && unit.portable
        // Units without assigned incidents
        && (!unit.incidents || !unit.incidents.length)
        // Ignore units that are off duty or at home
        && unit.state !== UnitStateDto.OFF_DUTY && !this.isHome(unit);
  }

  isAvailable(unit: UnitWithIncidents): boolean {
    if (!unit || !unit.portable || unit.state !== UnitStateDto.READY) {
      // Only consider portable, on-duty units
      return false;
    }

    if (!unit.incidents || !unit.incidents.length) {
      // No incidents means available
      return true;
    }

    // Only interruptable incidents means available
    return !unit.incidents.find(t => !this.isInterruptable(t));
  }

  private isInterruptable(task: TaskWithIncident): boolean {
    return task && task.incidentData &&
        task.incidentData.type !== IncidentTypeDto.Task && task.incidentData.type !== IncidentTypeDto.Transport;
  }

  allowSendHome(unit: UnitWithIncidents): boolean {
    if (!this.hasHome(unit) || this.isHome(unit)) {
      // Unit has no home or is already home
      return false;
    }

    if (!unit.incidents || !unit.incidents.length) {
      // No incidents: Allow in any case
      return true;
    }

    // Only incidents that allow sending home
    return !unit.incidents.find(t => !this.allowSendHomeWithTask(t));
  }

  private allowSendHomeWithTask(task: TaskWithIncident): boolean {
    return task && task.incidentData &&
        (task.incidentData.type === IncidentTypeDto.Standby || task.incidentData.type === IncidentTypeDto.Position);
  }

  allowStandby(unit: UnitWithIncidents): boolean {
    if (!unit) {
      return false;
    }

    if (!unit.incidents || !unit.incidents.length) {
      // No incidents: Allow in any case
      return true;
    }

    // Only incidents that allow standby
    return !unit.incidents.find(t => !this.allowStandbyWithTask(t));
  }

  private allowStandbyWithTask(task: TaskWithIncident): boolean {
    return task && task.incidentData && task.incidentData.type === IncidentTypeDto.Position;
  }

  allowHoldPosition(unit: UnitWithIncidents): boolean {
    if (!unit || !unit.portable || !unit.position || !unit.position.info) {
      return false;
    }

    if (!unit.incidents || !unit.incidents.length) {
      // No incidents: Allow in any case
      return true;
    }

    // Only incidents that allow standby
    return !unit.incidents.find(t => !this.allowHoldPositionWithTask(t));
  }

  private allowHoldPositionWithTask(task: TaskWithIncident): boolean {
    return task && task.incidentData && task.incidentData.type === IncidentTypeDto.Standby;
  }

  stateCss(unit: UnitWithIncidents): string {
    if (!unit) {
      return null;
    }

    switch (unit.state) {
      case UnitStateDto.READY:
        return this.isStandby(unit) ? 'unit-task-Standby' : 'unit-state-ready';
      case UnitStateDto.NOT_READY:
        return 'unit-state-not-ready';
      case UnitStateDto.OFF_DUTY:
        return 'unit-state-off-duty';
    }
  }

  private isStandby(unit: UnitWithIncidents): boolean {
    if (!unit.incidents || !unit.incidents.length) {
      // No incidents, therefore also not standby
      return false;
    }

    // Only standby incidents means the unit has state standby
    return !unit.incidents.find(t => !t || !t.incidentData || t.incidentData.type !== IncidentTypeDto.Standby);
  }

  popoverText(unit: UnitWithIncidents): string {
    // TODO This should probably be a component
    return null;

    // Bugfix orphaned Popovers (Ticket #17)
    // let content = '<div onmouseout="$(\'.popover\').remove();"><dl class=\'dl-horizontal list-narrower\'>';
    //
    // content += '<dt><span class=\'glyphicon glyphicon-map-marker\'></span></dt><dd><span class=\'pre\'>' +
    //     (this.position.isEmpty() ? 'N/A' : this.position.info().escapeHTML()) + '</span></dd>';
    //
    // content += '</dl><hr/><dl class=\'dl-horizontal\'>';
    //
    // if (this.incidentCount() > 0) {
    //   ko.utils.arrayForEach(this.incidents(), function(task) {
    //     if (task.incident() !== null) {
    //       content += '<dt>' + task.taskStateDependentTitle() + '</dt><dd>' + task.localizedTaskState() + '</dd>';
    //     }
    //   });
    // }
    // content += '</dl></div>';
    //
    // return {
    //   trigger: 'hover focus',
    //   placement: 'auto left',
    //   html: true,
    //   container: 'body',
    //   title: this.call.escapeHTML(),
    //   content: content
    // };
  }
}
