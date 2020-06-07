import {Component, Predicate} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {IncidentClosedReasonDto, IncidentDto, IncidentTypeDto} from 'mls-coceso-api';
import {ListOptions} from 'mls-common-data';
import {DialogContent} from 'mls-common-ui';

import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

import {IncidentHelper} from '../../../helpers';
import {IncidentWithUnits} from '../../../models';
import {TaskDataService} from '../../../services';

@Component({
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss']
})
export class IncidentListComponent implements DialogContent<IncidentListOptions> {

  readonly filterForm: FormGroup;
  private readonly optionsPredicates = new BehaviorSubject<Predicate<IncidentDto>[]>([]);
  private readonly formPredicates = new BehaviorSubject<Predicate<IncidentDto>[]>([]);

  readonly incidents: Observable<IncidentWithUnits[]>;

  readonly windowTitle: Observable<string>;
  readonly taskTitle = new ReplaySubject<string>(1);

  readonly activePanels = new Set<number>();

  filterCss = '';
  filterTypes: IncidentTypeDto[];
  filterStates: IncidentClosedReasonDto[];
  filterCasusAndPatient: boolean;

  private transportView: boolean;
  readonly highlighted = i => this.isHighlighted(i);

  constructor(private readonly taskService: TaskDataService, private readonly incidentHelper: IncidentHelper,
              private readonly translateService: TranslateService, fb: FormBuilder) {
    this.filterForm = fb.group({
      types: fb.group({Task: false, Transport: false, Position: false}),
      blue: fb.group({yes: false, no: false}),
      states: fb.group({Active: false, Closed: false, Cancelled: false, NoPatient: false, NoTransport: false}),
      casus: fb.group({yes: false, no: false}),
      patient: fb.group({yes: false, no: false})
    });
    this.filterForm.valueChanges.subscribe(value => this.buildFilterPredicates(value));

    this.incidents = combineLatest([this.formPredicates, this.optionsPredicates]).pipe(
        switchMap(([form, options]) => this.loadIncidents(...form, ...options)),
        shareReplay(1)
    );

    this.windowTitle = combineLatest([this.incidents, this.taskTitle]).pipe(
        map(([incidents, titlePrefix]) => this.buildTitle(incidents, titlePrefix))
    );
  }

  private loadIncidents(...filters: Predicate<IncidentDto>[]): Observable<IncidentWithUnits[]> {
    const options = new ListOptions<IncidentWithUnits>()
        .addFilters(...filters)
        .addSort((a, b) => +this.isHighlighted(b) - +this.isHighlighted(a));
    return this.taskService.getIncidents(options);
  }

  set data(data: IncidentListOptions) {
    data = data || {};

    const predicates: Predicate<IncidentDto>[] = [];
    this.filterTypes = [IncidentTypeDto.Task, IncidentTypeDto.Transport, IncidentTypeDto.Position];
    this.filterStates = Object.values(IncidentClosedReasonDto);
    this.transportView = false;
    this.filterCasusAndPatient = true;

    if (data && data.filter) {
      if (data.filter.onlyActive) {
        this.filterStates = null;
        predicates.push(i => !i.closed);
      }

      if (data.filter.onlyClosed) {
        this.filterStates = [
          IncidentClosedReasonDto.Closed, IncidentClosedReasonDto.Cancelled,
          IncidentClosedReasonDto.NoPatient, IncidentClosedReasonDto.NoTransport
        ];
        predicates.push(i => !!i.closed);
      }

      if (data.filter.types && data.filter.types.length) {
        this.filterTypes = data.filter.types.length > 1 ? data.filter.types : null;
        predicates.push(i => data.filter.types.includes(i.type as IncidentTypeDto));

        // Only show casus and patient filter option if tasks or transports are shown
        this.filterCasusAndPatient = !!data.filter.types.find(t => t === IncidentTypeDto.Task || t === IncidentTypeDto.Transport);

        // Use transport view (different function for determining "highlighted" state)
        this.transportView = data.filter.types.length === 1 && data.filter.types[0] === IncidentTypeDto.Transport;
      }

      if (data.filter.highlighted) {
        predicates.push(i => this.isHighlighted(i));
      }
    }

    this.optionsPredicates.next(predicates);

    this.taskTitle.next(this.translateService.instant(data.title || 'main.nav.incidents.header'));
  }

  isHighlighted(incident: IncidentDto): boolean {
    return this.transportView
        ? this.incidentHelper.isHighlightedTransport(incident)
        : this.incidentHelper.isHighlighted(incident);
  }

  private buildFilterPredicates(formValue: any) {
    const predicates: Predicate<IncidentDto>[] = [];

    const types = Object.values(IncidentTypeDto).filter(item => formValue.types[item]);
    if (types.length) {
      predicates.push(i => types.includes(i.type as IncidentTypeDto));
    }

    const states = Object.values(IncidentClosedReasonDto).filter(item => formValue.states[item]);
    if (states.length) {
      predicates.push(i => states.includes(i.closed as IncidentClosedReasonDto || IncidentClosedReasonDto.Active));
    }

    if (formValue.blue.yes && !formValue.blue.no) {
      predicates.push(i => i.blue);
    }
    if (formValue.blue.no && !formValue.blue.yes) {
      predicates.push(i => !i.blue);
    }

    if (formValue.casus.yes && !formValue.casus.no) {
      predicates.push(i => this.incidentHelper.hasCasusNr(i));
    }
    if (formValue.casus.no && !formValue.casus.yes) {
      predicates.push(i => !this.incidentHelper.hasCasusNr(i));
    }

    if (formValue.patient.yes && !formValue.patient.no) {
      predicates.push(i => !!i.patient);
    }
    if (formValue.patient.no && !formValue.patient.yes) {
      predicates.push(i => !i.patient);
    }

    this.filterCss = predicates.length ? 'filter-active' : '';
    this.formPredicates.next(predicates);
  }

  private buildTitle(incidents: IncidentDto[], titlePrefix: string) {
    const highlighted = incidents.filter(this.highlighted).length;
    return `${titlePrefix} (${highlighted}/${incidents.length})`;
  }
}

export interface IncidentListOptions {
  title?: string;
  filter?: IncidentListFilter;
}

export interface IncidentListFilter {
  onlyActive?: boolean;
  onlyClosed?: boolean;
  types?: IncidentTypeDto[];
  highlighted?: boolean;
}
