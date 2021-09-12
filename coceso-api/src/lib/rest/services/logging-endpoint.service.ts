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

import { ClientLog } from '../models/client-log';

@Injectable({
  providedIn: 'root',
})
export class LoggingEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation clientLog
   */
  static readonly ClientLogPath = '/logging';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clientLog()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  clientLog$Response(params: {
    body: ClientLog
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LoggingEndpointService.ClientLogPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `clientLog$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  clientLog(params: {
    body: ClientLog
  }): Observable<void> {

    return this.clientLog$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
