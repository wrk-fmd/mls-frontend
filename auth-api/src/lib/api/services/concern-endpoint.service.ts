/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { AuthApiConfiguration } from '../auth-api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ConcernDto } from '../models/concern-dto';

@Injectable({
  providedIn: 'root',
})
export class ConcernEndpointService extends BaseService {
  constructor(
    config: AuthApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getConcerns
   */
  static readonly GetConcernsPath = '/concerns';

  /**
   * Get all concerns.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConcerns()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConcerns$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ConcernDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ConcernEndpointService.GetConcernsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ConcernDto>>;
      })
    );
  }

  /**
   * Get all concerns.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConcerns$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConcerns(params?: {
  }): Observable<Array<ConcernDto>> {

    return this.getConcerns$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ConcernDto>>) => r.body as Array<ConcernDto>)
    );
  }

}
