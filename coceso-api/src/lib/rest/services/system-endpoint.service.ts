/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SystemInfoDto } from '../models/system-info-dto';
import { SystemTimeDto } from '../models/system-time-dto';

/**
 * System Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class SystemEndpointService extends __BaseService {
  static readonly getVersionPath = '/system';
  static readonly getSystemTimePath = '/system/time';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getVersionResponse(): __Observable<__StrictHttpResponse<SystemInfoDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/system`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SystemInfoDto>;
      })
    );
  }
  /**
   * @return OK
   */
  getVersion(): __Observable<SystemInfoDto> {
    return this.getVersionResponse().pipe(
      __map(_r => _r.body as SystemInfoDto)
    );
  }

  /**
   * @return OK
   */
  getSystemTimeResponse(): __Observable<__StrictHttpResponse<SystemTimeDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/system/time`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SystemTimeDto>;
      })
    );
  }
  /**
   * @return OK
   */
  getSystemTime(): __Observable<SystemTimeDto> {
    return this.getSystemTimeResponse().pipe(
      __map(_r => _r.body as SystemTimeDto)
    );
  }
}

module SystemEndpointService {
}

export { SystemEndpointService }
