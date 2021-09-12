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

import { TaskUpdateDto } from '../models/task-update-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateState
   */
  static readonly UpdateStatePath = '/concerns/{concern}/incidents/{incident}/units/{unit}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateState()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateState$Response(params: {
    concern: number;
    incident: number;
    unit: number;
    body: TaskUpdateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskEndpointService.UpdateStatePath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('incident', params.incident, {});
      rb.path('unit', params.unit, {});
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
   * To access the full response (for headers, for example), `updateState$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateState(params: {
    concern: number;
    incident: number;
    unit: number;
    body: TaskUpdateDto
  }): Observable<void> {

    return this.updateState$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation assign
   */
  static readonly AssignPath = '/concerns/{concern}/incidents/{incident}/units/{unit}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assign()` instead.
   *
   * This method doesn't expect any request body.
   */
  assign$Response(params: {
    concern: number;
    incident: number;
    unit: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskEndpointService.AssignPath, 'post');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('incident', params.incident, {});
      rb.path('unit', params.unit, {});
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
   * To access the full response (for headers, for example), `assign$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  assign(params: {
    concern: number;
    incident: number;
    unit: number;
  }): Observable<void> {

    return this.assign$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
