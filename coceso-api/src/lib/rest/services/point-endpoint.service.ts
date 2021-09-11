/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Point Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class PointEndpointService extends __BaseService {
  static readonly poiAutocompletePath = '/points/poiAutocomplete';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `PointEndpointService.PoiAutocompleteParams` containing the following parameters:
   *
   * - `q`: q
   *
   * - `concern`: concern
   *
   * @return OK
   */
  poiAutocompleteResponse(params: PointEndpointService.PoiAutocompleteParams): __Observable<__StrictHttpResponse<Array<string>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.q != null) __params = __params.set('q', params.q.toString());
    if (params.concern != null) __params = __params.set('concern', params.concern.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/points/poiAutocomplete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<string>>;
      })
    );
  }
  /**
   * @param params The `PointEndpointService.PoiAutocompleteParams` containing the following parameters:
   *
   * - `q`: q
   *
   * - `concern`: concern
   *
   * @return OK
   */
  poiAutocomplete(params: PointEndpointService.PoiAutocompleteParams): __Observable<Array<string>> {
    return this.poiAutocompleteResponse(params).pipe(
      __map(_r => _r.body as Array<string>)
    );
  }
}

module PointEndpointService {

  /**
   * Parameters for poiAutocomplete
   */
  export interface PoiAutocompleteParams {

    /**
     * q
     */
    q: string;

    /**
     * concern
     */
    concern?: number;
  }
}

export { PointEndpointService }
