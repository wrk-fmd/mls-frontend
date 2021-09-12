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

import { PatientBriefDto } from '../models/patient-brief-dto';
import { PatientCreateDto } from '../models/patient-create-dto';
import { PatientDto } from '../models/patient-dto';
import { PatientUpdateDto } from '../models/patient-update-dto';

@Injectable({
  providedIn: 'root',
})
export class PatientEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllPatients
   */
  static readonly GetAllPatientsPath = '/concerns/{concern}/patients';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPatients()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPatients$Response(params: {
    concern: number;
  }): Observable<StrictHttpResponse<Array<PatientDto>>> {

    const rb = new RequestBuilder(this.rootUrl, PatientEndpointService.GetAllPatientsPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PatientDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllPatients$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPatients(params: {
    concern: number;
  }): Observable<Array<PatientDto>> {

    return this.getAllPatients$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PatientDto>>) => r.body as Array<PatientDto>)
    );
  }

  /**
   * Path part for operation createPatient
   */
  static readonly CreatePatientPath = '/concerns/{concern}/patients';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPatient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatient$Response(params: {
    concern: number;
    body: PatientCreateDto
  }): Observable<StrictHttpResponse<PatientBriefDto>> {

    const rb = new RequestBuilder(this.rootUrl, PatientEndpointService.CreatePatientPath, 'post');
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
        return r as StrictHttpResponse<PatientBriefDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPatient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPatient(params: {
    concern: number;
    body: PatientCreateDto
  }): Observable<PatientBriefDto> {

    return this.createPatient$Response(params).pipe(
      map((r: StrictHttpResponse<PatientBriefDto>) => r.body as PatientBriefDto)
    );
  }

  /**
   * Path part for operation updatePatient
   */
  static readonly UpdatePatientPath = '/concerns/{concern}/patients/{patient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePatient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatient$Response(params: {
    concern: number;
    patient: number;
    body: PatientUpdateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PatientEndpointService.UpdatePatientPath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('patient', params.patient, {});
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
   * To access the full response (for headers, for example), `updatePatient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePatient(params: {
    concern: number;
    patient: number;
    body: PatientUpdateDto
  }): Observable<void> {

    return this.updatePatient$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
