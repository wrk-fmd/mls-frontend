/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { CocesoRestConfiguration } from '../coceso-rest-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class PointEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation poiAutocomplete
   */
  static readonly PoiAutocompletePath = '/points/poiAutocomplete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `poiAutocomplete()` instead.
   *
   * This method doesn't expect any request body.
   */
  poiAutocomplete$Response(params: {
    'q': string;
    concern: number;
  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, PointEndpointService.PoiAutocompletePath, 'get');
    if (params) {
      rb.query('q', params['q'], {});
      rb.query('concern', params.concern, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `poiAutocomplete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  poiAutocomplete(params: {
    'q': string;
    concern: number;
  }): Observable<Array<string>> {

    return this.poiAutocomplete$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

}
