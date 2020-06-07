import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {ConcernDto, ConcernEndpointService, IncidentUpdateDto, SectionCreateDto} from 'mls-coceso-api';
import {DataService} from 'mls-common-data';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {CocesoWatchService} from './coceso.watch.service';

@Injectable()
export class ConcernDataService extends DataService<ConcernDto> implements Resolve<void> {

  private readonly active = new BehaviorSubject<number>(null);
  private readonly section = new BehaviorSubject<string>(null);

  constructor(private readonly endpoint: ConcernEndpointService, watchService: CocesoWatchService) {
    super(watchService.watchConcerns());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    // TODO This only takes care of setting the concern id, but does not unset it after leaving the page
    this.active.next(+route.paramMap.get('concernId') || null);
  }

  getActiveId(): Observable<number> {
    return this.active;
  }

  getActiveConcern(): Observable<ConcernDto> {
    return this.active.pipe(switchMap(id => this.getById(id)));
  }

  runWithConcern<T>(runnable: (concern: number) => Observable<T>): Observable<T> {
    const c = this.active.value;
    // TODO i18n
    return c ? runnable(c) : throwError('No concern set');
  }

  getSections(): Observable<string[]> {
    return this.getActiveConcern().pipe(map(c => c && c.sections && c.sections.length ? c.sections.sort() : null));
  }

  getActiveSection(): Observable<string> {
    return this.section;
  }

  setActiveSection(section: string) {
    this.section.next(section);
  }

  createConcern(data: ConcernDto): Observable<number> {
    return this.endpoint.createConcern(data).pipe(map(i => i.id));
  }

  updateConcern(data: IncidentUpdateDto): Observable<null> {
    return this.runWithConcern(
        concern => this.endpoint.updateConcern({concern, data})
    );
  }

  setConcernOpen(open: boolean): Observable<null> {
    return this.runWithConcern(
        concern => open ? this.endpoint.openConcern(concern) : this.endpoint.closeConcern(concern)
    );
  }

  addSection(data: SectionCreateDto): Observable<null> {
    return this.runWithConcern(
        concern => this.endpoint.addSection({concern, data})
    );
  }

  removeSection(section: string): Observable<null> {
    return this.runWithConcern(
        concern => this.endpoint.removeSection({concern, section: encodeURIComponent(section)})
    );
  }

  protected defaultSort(): ((a: ConcernDto, b: ConcernDto) => number)[] {
    return [
      (a, b) => a.name.localeCompare(b.name),
      ...super.defaultSort()
    ];
  }
}
