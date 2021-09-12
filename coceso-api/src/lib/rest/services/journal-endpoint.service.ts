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

import { CustomJournalEntryDto } from '../models/custom-journal-entry-dto';
import { JournalEntryDto } from '../models/journal-entry-dto';

@Injectable({
  providedIn: 'root',
})
export class JournalEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCustomJournalEntries
   */
  static readonly GetCustomJournalEntriesPath = '/concerns/{concern}/journal';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCustomJournalEntries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomJournalEntries$Response(params: {
    concern: number;
  }): Observable<StrictHttpResponse<Array<JournalEntryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, JournalEndpointService.GetCustomJournalEntriesPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<JournalEntryDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCustomJournalEntries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomJournalEntries(params: {
    concern: number;
  }): Observable<Array<JournalEntryDto>> {

    return this.getCustomJournalEntries$Response(params).pipe(
      map((r: StrictHttpResponse<Array<JournalEntryDto>>) => r.body as Array<JournalEntryDto>)
    );
  }

  /**
   * Path part for operation addCustomJournalEntry
   */
  static readonly AddCustomJournalEntryPath = '/concerns/{concern}/journal';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCustomJournalEntry()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCustomJournalEntry$Response(params: {
    concern: number;
    body: CustomJournalEntryDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, JournalEndpointService.AddCustomJournalEntryPath, 'post');
    if (params) {
      rb.path('concern', params.concern, {});
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
   * To access the full response (for headers, for example), `addCustomJournalEntry$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCustomJournalEntry(params: {
    concern: number;
    body: CustomJournalEntryDto
  }): Observable<void> {

    return this.addCustomJournalEntry$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getJournalByIncident
   */
  static readonly GetJournalByIncidentPath = '/concerns/{concern}/journal/incidents/{incident}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJournalByIncident()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJournalByIncident$Response(params: {
    concern: number;
    incident: number;
    limit?: number;
  }): Observable<StrictHttpResponse<Array<JournalEntryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, JournalEndpointService.GetJournalByIncidentPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('incident', params.incident, {});
      rb.query('limit', params.limit, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<JournalEntryDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getJournalByIncident$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJournalByIncident(params: {
    concern: number;
    incident: number;
    limit?: number;
  }): Observable<Array<JournalEntryDto>> {

    return this.getJournalByIncident$Response(params).pipe(
      map((r: StrictHttpResponse<Array<JournalEntryDto>>) => r.body as Array<JournalEntryDto>)
    );
  }

  /**
   * Path part for operation getLastJournalEntries
   */
  static readonly GetLastJournalEntriesPath = '/concerns/{concern}/journal/last/{limit}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLastJournalEntries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastJournalEntries$Response(params: {
    concern: number;
    limit: number;
  }): Observable<StrictHttpResponse<Array<JournalEntryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, JournalEndpointService.GetLastJournalEntriesPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('limit', params.limit, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<JournalEntryDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLastJournalEntries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastJournalEntries(params: {
    concern: number;
    limit: number;
  }): Observable<Array<JournalEntryDto>> {

    return this.getLastJournalEntries$Response(params).pipe(
      map((r: StrictHttpResponse<Array<JournalEntryDto>>) => r.body as Array<JournalEntryDto>)
    );
  }

  /**
   * Path part for operation getJournalByUnit
   */
  static readonly GetJournalByUnitPath = '/concerns/{concern}/journal/units/{unit}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJournalByUnit()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJournalByUnit$Response(params: {
    concern: number;
    unit: number;
    limit?: number;
  }): Observable<StrictHttpResponse<Array<JournalEntryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, JournalEndpointService.GetJournalByUnitPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('unit', params.unit, {});
      rb.query('limit', params.limit, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<JournalEntryDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getJournalByUnit$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJournalByUnit(params: {
    concern: number;
    unit: number;
    limit?: number;
  }): Observable<Array<JournalEntryDto>> {

    return this.getJournalByUnit$Response(params).pipe(
      map((r: StrictHttpResponse<Array<JournalEntryDto>>) => r.body as Array<JournalEntryDto>)
    );
  }

}
