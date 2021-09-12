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

import { SystemInfoDto } from '../models/system-info-dto';
import { SystemTimeDto } from '../models/system-time-dto';

@Injectable({
  providedIn: 'root',
})
export class SystemEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getVersion
   */
  static readonly GetVersionPath = '/system';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVersion()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVersion$Response(params?: {
  }): Observable<StrictHttpResponse<SystemInfoDto>> {

    const rb = new RequestBuilder(this.rootUrl, SystemEndpointService.GetVersionPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SystemInfoDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVersion$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVersion(params?: {
  }): Observable<SystemInfoDto> {

    return this.getVersion$Response(params).pipe(
      map((r: StrictHttpResponse<SystemInfoDto>) => r.body as SystemInfoDto)
    );
  }

  /**
   * Path part for operation getSystemTime
   */
  static readonly GetSystemTimePath = '/system/time';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSystemTime()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSystemTime$Response(params?: {
  }): Observable<StrictHttpResponse<SystemTimeDto>> {

    const rb = new RequestBuilder(this.rootUrl, SystemEndpointService.GetSystemTimePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SystemTimeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSystemTime$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSystemTime(params?: {
  }): Observable<SystemTimeDto> {

    return this.getSystemTime$Response(params).pipe(
      map((r: StrictHttpResponse<SystemTimeDto>) => r.body as SystemTimeDto)
    );
  }

}
