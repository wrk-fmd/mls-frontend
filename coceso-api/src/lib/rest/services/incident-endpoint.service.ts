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

import { IncidentBriefDto } from '../models/incident-brief-dto';
import { IncidentCreateDto } from '../models/incident-create-dto';
import { IncidentDto } from '../models/incident-dto';
import { IncidentUpdateDto } from '../models/incident-update-dto';
import { SendAlarmDto } from '../models/send-alarm-dto';

@Injectable({
  providedIn: 'root',
})
export class IncidentEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllIncidents
   */
  static readonly GetAllIncidentsPath = '/concerns/{concern}/incidents';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllIncidents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllIncidents$Response(params: {
    concern: number;
  }): Observable<StrictHttpResponse<Array<IncidentDto>>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEndpointService.GetAllIncidentsPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IncidentDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllIncidents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllIncidents(params: {
    concern: number;
  }): Observable<Array<IncidentDto>> {

    return this.getAllIncidents$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IncidentDto>>) => r.body as Array<IncidentDto>)
    );
  }

  /**
   * Path part for operation createIncident
   */
  static readonly CreateIncidentPath = '/concerns/{concern}/incidents';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createIncident()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createIncident$Response(params: {
    concern: number;
    body: IncidentCreateDto
  }): Observable<StrictHttpResponse<IncidentBriefDto>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEndpointService.CreateIncidentPath, 'post');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IncidentBriefDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createIncident$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createIncident(params: {
    concern: number;
    body: IncidentCreateDto
  }): Observable<IncidentBriefDto> {

    return this.createIncident$Response(params).pipe(
      map((r: StrictHttpResponse<IncidentBriefDto>) => r.body as IncidentBriefDto)
    );
  }

  /**
   * Path part for operation getAlarmTemplates
   */
  static readonly GetAlarmTemplatesPath = '/concerns/{concern}/incidents/templates/alarm';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAlarmTemplates()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlarmTemplates$Response(params: {
    concern: number;
  }): Observable<StrictHttpResponse<{ [key: string]: string }>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEndpointService.GetAlarmTemplatesPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ [key: string]: string }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAlarmTemplates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAlarmTemplates(params: {
    concern: number;
  }): Observable<{ [key: string]: string }> {

    return this.getAlarmTemplates$Response(params).pipe(
      map((r: StrictHttpResponse<{ [key: string]: string }>) => r.body as { [key: string]: string })
    );
  }

  /**
   * Path part for operation updateIncident
   */
  static readonly UpdateIncidentPath = '/concerns/{concern}/incidents/{incident}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateIncident()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateIncident$Response(params: {
    concern: number;
    incident: number;
    body: IncidentUpdateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEndpointService.UpdateIncidentPath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('incident', params.incident, {});
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
   * To access the full response (for headers, for example), `updateIncident$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateIncident(params: {
    concern: number;
    incident: number;
    body: IncidentUpdateDto
  }): Observable<void> {

    return this.updateIncident$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation sendAlarm
   */
  static readonly SendAlarmPath = '/concerns/{concern}/incidents/{incident}/alarm';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendAlarm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendAlarm$Response(params: {
    concern: number;
    incident: number;
    body: SendAlarmDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEndpointService.SendAlarmPath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('incident', params.incident, {});
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
   * To access the full response (for headers, for example), `sendAlarm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendAlarm(params: {
    concern: number;
    incident: number;
    body: SendAlarmDto
  }): Observable<void> {

    return this.sendAlarm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation assignPatient
   */
  static readonly AssignPatientPath = '/concerns/{concern}/incidents/{incident}/patients/{patient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assignPatient()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignPatient$Response(params: {
    concern: number;
    incident: number;
    patient: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEndpointService.AssignPatientPath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('incident', params.incident, {});
      rb.path('patient', params.patient, {});
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
   * To access the full response (for headers, for example), `assignPatient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignPatient(params: {
    concern: number;
    incident: number;
    patient: number;
  }): Observable<void> {

    return this.assignPatient$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
