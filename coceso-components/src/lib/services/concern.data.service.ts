import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {CocesoWatchService, ConcernCreateDto, ConcernDto, ConcernEndpointService, ConcernUpdateDto, SectionCreateDto} from 'mls-coceso-api';
import {DataService} from 'mls-common-data';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class ConcernDataService extends DataService<ConcernDto> implements Resolve<void> {

  private readonly active = new BehaviorSubject<number | undefined>(undefined);
  private readonly section = new BehaviorSubject<string | null>(null);

  constructor(private readonly endpoint: ConcernEndpointService, watchService: CocesoWatchService) {
    super(watchService.watchConcerns());
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    // TODO This only takes care of setting the concern id, but does not unset it after leaving the page
    const concernId = route.paramMap.get('concernId');
    this.active.next(concernId ? +concernId : undefined);
  }

  getActiveId(): Observable<number | undefined> {
    return this.active;
  }

  getActiveConcern(): Observable<ConcernDto | undefined> {
    return this.active.pipe(switchMap(id => this.getById(id)));
  }

  runWithConcern<T>(runnable: (concern: number) => Observable<T>): Observable<T> {
    const c = this.active.value;
    // TODO i18n
    return c ? runnable(c) : throwError('No concern set');
  }

  getSections(): Observable<string[] | null> {
    return this.getActiveConcern().pipe(map(c => c && c.sections && c.sections.length ? c.sections.sort() : null));
  }

  getActiveSection(): Observable<string | null> {
    return this.section;
  }

  setActiveSection(section: string | null) {
    this.section.next(section);
  }

  createConcern(body: ConcernCreateDto): Observable<number> {
    return this.endpoint.createConcern({body}).pipe(map(i => i.id));
  }

  updateConcern(body: ConcernUpdateDto): Observable<void> {
    return this.runWithConcern(
        concern => this.endpoint.updateConcern({concern, body})
    );
  }

  setConcernOpen(open: boolean): Observable<void> {
    return this.runWithConcern(
        concern => open ? this.endpoint.openConcern({concern}) : this.endpoint.closeConcern({concern})
    );
  }

  addSection(body: SectionCreateDto): Observable<void> {
    return this.runWithConcern(
        concern => this.endpoint.addSection({concern, body})
    );
  }

  removeSection(section: string): Observable<void> {
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
