/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ClientLog } from '../models/client-log';

/**
 * Logging Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class LoggingEndpointService extends __BaseService {
  static readonly clientLogPath = '/logging';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param clientLog clientLog
   */
  clientLogResponse(clientLog: ClientLog): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = clientLog;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/logging`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param clientLog clientLog
   */
  clientLog(clientLog: ClientLog): __Observable<null> {
    return this.clientLogResponse(clientLog).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module LoggingEndpointService {
}

export { LoggingEndpointService }
