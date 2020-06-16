/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { IncidentDto } from '../models/incident-dto';
import { IncidentBriefDto } from '../models/incident-brief-dto';
import { IncidentCreateDto } from '../models/incident-create-dto';
import { IncidentUpdateDto } from '../models/incident-update-dto';
import { SendAlarmDto } from '../models/send-alarm-dto';

/**
 * Incident Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class IncidentEndpointService extends __BaseService {
  static readonly getAllIncidentsPath = '/concerns/{concern}/incidents';
  static readonly createIncidentPath = '/concerns/{concern}/incidents';
  static readonly getAlarmTemplatesPath = '/concerns/{concern}/incidents/templates/alarm';
  static readonly updateIncidentPath = '/concerns/{concern}/incidents/{incident}';
  static readonly sendAlarmPath = '/concerns/{concern}/incidents/{incident}/alarm';
  static readonly assignPatientPath = '/concerns/{concern}/incidents/{incident}/patients/{patient}';

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
  getAllIncidentsResponse(concern: number): __Observable<__StrictHttpResponse<Array<IncidentDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${concern}/incidents`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<IncidentDto>>;
      })
    );
  }
  /**
   * @param concern concern
   * @return OK
   */
  getAllIncidents(concern: number): __Observable<Array<IncidentDto>> {
    return this.getAllIncidentsResponse(concern).pipe(
      __map(_r => _r.body as Array<IncidentDto>)
    );
  }

  /**
   * @param params The `IncidentEndpointService.CreateIncidentParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   *
   * @return OK
   */
  createIncidentResponse(params: IncidentEndpointService.CreateIncidentParams): __Observable<__StrictHttpResponse<IncidentBriefDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.data;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/incidents`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<IncidentBriefDto>;
      })
    );
  }
  /**
   * @param params The `IncidentEndpointService.CreateIncidentParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   *
   * @return OK
   */
  createIncident(params: IncidentEndpointService.CreateIncidentParams): __Observable<IncidentBriefDto> {
    return this.createIncidentResponse(params).pipe(
      __map(_r => _r.body as IncidentBriefDto)
    );
  }

  /**
   * @param concern concern
   * @return OK
   */
  getAlarmTemplatesResponse(concern: number): __Observable<__StrictHttpResponse<{[key: string]: string}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${concern}/incidents/templates/alarm`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{[key: string]: string}>;
      })
    );
  }
  /**
   * @param concern concern
   * @return OK
   */
  getAlarmTemplates(concern: number): __Observable<{[key: string]: string}> {
    return this.getAlarmTemplatesResponse(concern).pipe(
      __map(_r => _r.body as {[key: string]: string})
    );
  }

  /**
   * @param params The `IncidentEndpointService.UpdateIncidentParams` containing the following parameters:
   *
   * - `incident`: incident
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  updateIncidentResponse(params: IncidentEndpointService.UpdateIncidentParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}/incidents/${params.incident}`,
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
   * @param params The `IncidentEndpointService.UpdateIncidentParams` containing the following parameters:
   *
   * - `incident`: incident
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  updateIncident(params: IncidentEndpointService.UpdateIncidentParams): __Observable<null> {
    return this.updateIncidentResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `IncidentEndpointService.SendAlarmParams` containing the following parameters:
   *
   * - `incident`: incident
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  sendAlarmResponse(params: IncidentEndpointService.SendAlarmParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}/incidents/${params.incident}/alarm`,
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
   * @param params The `IncidentEndpointService.SendAlarmParams` containing the following parameters:
   *
   * - `incident`: incident
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  sendAlarm(params: IncidentEndpointService.SendAlarmParams): __Observable<null> {
    return this.sendAlarmResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `IncidentEndpointService.AssignPatientParams` containing the following parameters:
   *
   * - `patient`: patient
   *
   * - `incident`: incident
   *
   * - `concern`: concern
   */
  assignPatientResponse(params: IncidentEndpointService.AssignPatientParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}/incidents/${params.incident}/patients/${params.patient}`,
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
   * @param params The `IncidentEndpointService.AssignPatientParams` containing the following parameters:
   *
   * - `patient`: patient
   *
   * - `incident`: incident
   *
   * - `concern`: concern
   */
  assignPatient(params: IncidentEndpointService.AssignPatientParams): __Observable<null> {
    return this.assignPatientResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module IncidentEndpointService {

  /**
   * Parameters for createIncident
   */
  export interface CreateIncidentParams {

    /**
     * data
     */
    data: IncidentCreateDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for updateIncident
   */
  export interface UpdateIncidentParams {

    /**
     * incident
     */
    incident: number;

    /**
     * data
     */
    data: IncidentUpdateDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for sendAlarm
   */
  export interface SendAlarmParams {

    /**
     * incident
     */
    incident: number;

    /**
     * data
     */
    data: SendAlarmDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for assignPatient
   */
  export interface AssignPatientParams {

    /**
     * patient
     */
    patient: number;

    /**
     * incident
     */
    incident: number;

    /**
     * concern
     */
    concern: number;
  }
}

export { IncidentEndpointService }
