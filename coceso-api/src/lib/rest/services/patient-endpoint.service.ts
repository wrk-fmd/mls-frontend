/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PatientDto } from '../models/patient-dto';
import { PatientBriefDto } from '../models/patient-brief-dto';
import { PatientCreateDto } from '../models/patient-create-dto';
import { PatientUpdateDto } from '../models/patient-update-dto';

/**
 * Patient Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class PatientEndpointService extends __BaseService {
  static readonly getAllPatientsPath = '/concerns/{concern}/patients';
  static readonly createPatientPath = '/concerns/{concern}/patients';
  static readonly updatePatientPath = '/concerns/{concern}/patients/{patient}';

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
  getAllPatientsResponse(concern: number): __Observable<__StrictHttpResponse<Array<PatientDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${concern}/patients`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PatientDto>>;
      })
    );
  }
  /**
   * @param concern concern
   * @return OK
   */
  getAllPatients(concern: number): __Observable<Array<PatientDto>> {
    return this.getAllPatientsResponse(concern).pipe(
      __map(_r => _r.body as Array<PatientDto>)
    );
  }

  /**
   * @param params The `PatientEndpointService.CreatePatientParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   *
   * @return OK
   */
  createPatientResponse(params: PatientEndpointService.CreatePatientParams): __Observable<__StrictHttpResponse<PatientBriefDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.data;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/patients`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PatientBriefDto>;
      })
    );
  }
  /**
   * @param params The `PatientEndpointService.CreatePatientParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   *
   * @return OK
   */
  createPatient(params: PatientEndpointService.CreatePatientParams): __Observable<PatientBriefDto> {
    return this.createPatientResponse(params).pipe(
      __map(_r => _r.body as PatientBriefDto)
    );
  }

  /**
   * @param params The `PatientEndpointService.UpdatePatientParams` containing the following parameters:
   *
   * - `patient`: patient
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  updatePatientResponse(params: PatientEndpointService.UpdatePatientParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}/patients/${params.patient}`,
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
   * @param params The `PatientEndpointService.UpdatePatientParams` containing the following parameters:
   *
   * - `patient`: patient
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  updatePatient(params: PatientEndpointService.UpdatePatientParams): __Observable<null> {
    return this.updatePatientResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PatientEndpointService {

  /**
   * Parameters for createPatient
   */
  export interface CreatePatientParams {

    /**
     * data
     */
    data: PatientCreateDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for updatePatient
   */
  export interface UpdatePatientParams {

    /**
     * patient
     */
    patient: number;

    /**
     * data
     */
    data: PatientUpdateDto;

    /**
     * concern
     */
    concern: number;
  }
}

export { PatientEndpointService }
