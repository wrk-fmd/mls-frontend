import {AfterViewInit, Component} from '@angular/core';
import {FormControl} from '@angular/forms';

import {CocesoWatchService, GeocodingResult, PointDto} from 'mls-coceso-api';
import {FormBaseComponent} from 'mls-common-forms';

import {Observable, of} from 'rxjs';
import {scan, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'coceso-form-point',
  templateUrl: './point.component.html'
})
export class FormPointComponent extends FormBaseComponent<FormControl> implements AfterViewInit {

  suggestions?: Observable<GeocodingResult[]>;

  constructor(private readonly watchService: CocesoWatchService) {
    super();
  }

  ngAfterViewInit(): void {
    this.suggestions = this.control!.valueChanges.pipe(
        switchMap(request => this.loadSuggestions(request))
    );
  }

  private loadSuggestions(request: PointDto): Observable<GeocodingResult[]> {
    const result: GeocodingResult[] = []
    if (!request || request.coordinates) {
      // No request data, or coordinates already given: Don't suggest anything
      return of(result);
    }

    return this.watchService.requestGeocode(request).pipe(
        scan((acc, point) => {
          // TODO List should be sorted by priority
          acc.push(point);
          return acc;
        }, result),
        startWith(result)
    );
  }
}
