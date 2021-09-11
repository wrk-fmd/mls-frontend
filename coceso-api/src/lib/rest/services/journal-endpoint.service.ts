/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { JournalEntryDto } from '../models/journal-entry-dto';
import { CustomJournalEntryDto } from '../models/custom-journal-entry-dto';

/**
 * Journal Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class JournalEndpointService extends __BaseService {
  static readonly getCustomJournalEntriesPath = '/concerns/{concern}/journal';
  static readonly addCustomJournalEntryPath = '/concerns/{concern}/journal';
  static readonly getJournalByIncidentPath = '/concerns/{concern}/journal/incidents/{incident}';
  static readonly getLastJournalEntriesPath = '/concerns/{concern}/journal/last/{limit}';
  static readonly getJournalByUnitPath = '/concerns/{concern}/journal/units/{unit}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param concern concern
   * @return OK
   */
  getCustomJournalEntriesResponse(concern: number): __Observable<__StrictHttpResponse<Array<JournalEntryDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${concern}/journal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<JournalEntryDto>>;
      })
    );
  }
  /**
   * @param concern concern
   * @return OK
   */
  getCustomJournalEntries(concern: number): __Observable<Array<JournalEntryDto>> {
    return this.getCustomJournalEntriesResponse(concern).pipe(
      __map(_r => _r.body as Array<JournalEntryDto>)
    );
  }

  /**
   * @param params The `JournalEndpointService.AddCustomJournalEntryParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  addCustomJournalEntryResponse(params: JournalEndpointService.AddCustomJournalEntryParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.data;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/journal`,
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
   * @param params The `JournalEndpointService.AddCustomJournalEntryParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  addCustomJournalEntry(params: JournalEndpointService.AddCustomJournalEntryParams): __Observable<null> {
    return this.addCustomJournalEntryResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `JournalEndpointService.GetJournalByIncidentParams` containing the following parameters:
   *
   * - `incident`: incident
   *
   * - `concern`: concern
   *
   * - `limit`: limit
   *
   * @return OK
   */
  getJournalByIncidentResponse(params: JournalEndpointService.GetJournalByIncidentParams): __Observable<__StrictHttpResponse<Array<JournalEntryDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${params.concern}/journal/incidents/${params.incident}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<JournalEntryDto>>;
      })
    );
  }
  /**
   * @param params The `JournalEndpointService.GetJournalByIncidentParams` containing the following parameters:
   *
   * - `incident`: incident
   *
   * - `concern`: concern
   *
   * - `limit`: limit
   *
   * @return OK
   */
  getJournalByIncident(params: JournalEndpointService.GetJournalByIncidentParams): __Observable<Array<JournalEntryDto>> {
    return this.getJournalByIncidentResponse(params).pipe(
      __map(_r => _r.body as Array<JournalEntryDto>)
    );
  }

  /**
   * @param params The `JournalEndpointService.GetLastJournalEntriesParams` containing the following parameters:
   *
   * - `limit`: limit
   *
   * - `concern`: concern
   *
   * @return OK
   */
  getLastJournalEntriesResponse(params: JournalEndpointService.GetLastJournalEntriesParams): __Observable<__StrictHttpResponse<Array<JournalEntryDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${params.concern}/journal/last/${params.limit}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<JournalEntryDto>>;
      })
    );
  }
  /**
   * @param params The `JournalEndpointService.GetLastJournalEntriesParams` containing the following parameters:
   *
   * - `limit`: limit
   *
   * - `concern`: concern
   *
   * @return OK
   */
  getLastJournalEntries(params: JournalEndpointService.GetLastJournalEntriesParams): __Observable<Array<JournalEntryDto>> {
    return this.getLastJournalEntriesResponse(params).pipe(
      __map(_r => _r.body as Array<JournalEntryDto>)
    );
  }

  /**
   * @param params The `JournalEndpointService.GetJournalByUnitParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `concern`: concern
   *
   * - `limit`: limit
   *
   * @return OK
   */
  getJournalByUnitResponse(params: JournalEndpointService.GetJournalByUnitParams): __Observable<__StrictHttpResponse<Array<JournalEntryDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${params.concern}/journal/units/${params.unit}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<JournalEntryDto>>;
      })
    );
  }
  /**
   * @param params The `JournalEndpointService.GetJournalByUnitParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `concern`: concern
   *
   * - `limit`: limit
   *
   * @return OK
   */
  getJournalByUnit(params: JournalEndpointService.GetJournalByUnitParams): __Observable<Array<JournalEntryDto>> {
    return this.getJournalByUnitResponse(params).pipe(
      __map(_r => _r.body as Array<JournalEntryDto>)
    );
  }
}

module JournalEndpointService {

  /**
   * Parameters for addCustomJournalEntry
   */
  export interface AddCustomJournalEntryParams {

    /**
     * data
     */
    data: CustomJournalEntryDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for getJournalByIncident
   */
  export interface GetJournalByIncidentParams {

    /**
     * incident
     */
    incident: number;

    /**
     * concern
     */
    concern: number;

    /**
     * limit
     */
    limit?: number;
  }

  /**
   * Parameters for getLastJournalEntries
   */
  export interface GetLastJournalEntriesParams {

    /**
     * limit
     */
    limit: number;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for getJournalByUnit
   */
  export interface GetJournalByUnitParams {

    /**
     * unit
     */
    unit: number;

    /**
     * concern
     */
    concern: number;

    /**
     * limit
     */
    limit?: number;
  }
}

export { JournalEndpointService }
