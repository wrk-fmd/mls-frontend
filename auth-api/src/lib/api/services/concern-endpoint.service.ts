/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { AuthApiConfiguration as __Configuration } from '../auth-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConcernDto } from '../models/concern-dto';

/**
 * Concern Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class ConcernEndpointService extends __BaseService {
  static readonly getConcernsPath = '/concerns';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getConcernsResponse(): __Observable<__StrictHttpResponse<Array<ConcernDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConcernDto>>;
      })
    );
  }
  /**
   * @return OK
   */
  getConcerns(): __Observable<Array<ConcernDto>> {
    return this.getConcernsResponse().pipe(
      __map(_r => _r.body as Array<ConcernDto>)
    );
  }
}

module ConcernEndpointService {
}

export { ConcernEndpointService }
