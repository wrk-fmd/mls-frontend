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

import { SendMessageDto } from '../models/send-message-dto';
import { UnitBatchCreateDto } from '../models/unit-batch-create-dto';
import { UnitBriefDto } from '../models/unit-brief-dto';
import { UnitCreateDto } from '../models/unit-create-dto';
import { UnitDto } from '../models/unit-dto';
import { UnitUpdateDto } from '../models/unit-update-dto';

@Injectable({
  providedIn: 'root',
})
export class UnitEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllUnits
   */
  static readonly GetAllUnitsPath = '/concerns/{concern}/units';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUnits()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUnits$Response(params: {
    concern: number;
  }): Observable<StrictHttpResponse<Array<UnitDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.GetAllUnitsPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UnitDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllUnits$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUnits(params: {
    concern: number;
  }): Observable<Array<UnitDto>> {

    return this.getAllUnits$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UnitDto>>) => r.body as Array<UnitDto>)
    );
  }

  /**
   * Path part for operation createUnit
   */
  static readonly CreateUnitPath = '/concerns/{concern}/units';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUnit()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUnit$Response(params: {
    concern: number;
    body: UnitCreateDto
  }): Observable<StrictHttpResponse<UnitBriefDto>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.CreateUnitPath, 'post');
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
        return r as StrictHttpResponse<UnitBriefDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUnit$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUnit(params: {
    concern: number;
    body: UnitCreateDto
  }): Observable<UnitBriefDto> {

    return this.createUnit$Response(params).pipe(
      map((r: StrictHttpResponse<UnitBriefDto>) => r.body as UnitBriefDto)
    );
  }

  /**
   * Path part for operation createUnitsBatch
   */
  static readonly CreateUnitsBatchPath = '/concerns/{concern}/units/batch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUnitsBatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUnitsBatch$Response(params: {
    concern: number;
    body: UnitBatchCreateDto
  }): Observable<StrictHttpResponse<Array<UnitBriefDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.CreateUnitsBatchPath, 'post');
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
        return r as StrictHttpResponse<Array<UnitBriefDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUnitsBatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUnitsBatch(params: {
    concern: number;
    body: UnitBatchCreateDto
  }): Observable<Array<UnitBriefDto>> {

    return this.createUnitsBatch$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UnitBriefDto>>) => r.body as Array<UnitBriefDto>)
    );
  }

  /**
   * Path part for operation updateUnit
   */
  static readonly UpdateUnitPath = '/concerns/{concern}/units/{unit}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUnit()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUnit$Response(params: {
    concern: number;
    unit: number;
    body: UnitUpdateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.UpdateUnitPath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
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
   * To access the full response (for headers, for example), `updateUnit$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUnit(params: {
    concern: number;
    unit: number;
    body: UnitUpdateDto
  }): Observable<void> {

    return this.updateUnit$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeUnit
   */
  static readonly RemoveUnitPath = '/concerns/{concern}/units/{unit}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeUnit()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUnit$Response(params: {
    concern: number;
    unit: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.RemoveUnitPath, 'delete');
    if (params) {
      rb.path('concern', params.concern, {});
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
   * To access the full response (for headers, for example), `removeUnit$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUnit(params: {
    concern: number;
    unit: number;
  }): Observable<void> {

    return this.removeUnit$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation assignCrewMember
   */
  static readonly AssignCrewMemberPath = '/concerns/{concern}/units/{unit}/crew/{member}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assignCrewMember()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignCrewMember$Response(params: {
    concern: number;
    unit: number;
    member: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.AssignCrewMemberPath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('unit', params.unit, {});
      rb.path('member', params.member, {});
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
   * To access the full response (for headers, for example), `assignCrewMember$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignCrewMember(params: {
    concern: number;
    unit: number;
    member: number;
  }): Observable<void> {

    return this.assignCrewMember$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeCrewMember
   */
  static readonly RemoveCrewMemberPath = '/concerns/{concern}/units/{unit}/crew/{member}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeCrewMember()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCrewMember$Response(params: {
    concern: number;
    unit: number;
    member: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.RemoveCrewMemberPath, 'delete');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('unit', params.unit, {});
      rb.path('member', params.member, {});
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
   * To access the full response (for headers, for example), `removeCrewMember$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCrewMember(params: {
    concern: number;
    unit: number;
    member: number;
  }): Observable<void> {

    return this.removeCrewMember$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation sendMessage
   */
  static readonly SendMessagePath = '/concerns/{concern}/units/{unit}/message';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMessage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendMessage$Response(params: {
    concern: number;
    unit: number;
    body: SendMessageDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.SendMessagePath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
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
   * To access the full response (for headers, for example), `sendMessage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendMessage(params: {
    concern: number;
    unit: number;
    body: SendMessageDto
  }): Observable<void> {

    return this.sendMessage$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation holdPosition
   */
  static readonly HoldPositionPath = '/concerns/{concern}/units/{unit}/tasks/holdPosition';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `holdPosition()` instead.
   *
   * This method doesn't expect any request body.
   */
  holdPosition$Response(params: {
    concern: number;
    unit: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.HoldPositionPath, 'post');
    if (params) {
      rb.path('concern', params.concern, {});
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
   * To access the full response (for headers, for example), `holdPosition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  holdPosition(params: {
    concern: number;
    unit: number;
  }): Observable<void> {

    return this.holdPosition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation sendHome
   */
  static readonly SendHomePath = '/concerns/{concern}/units/{unit}/tasks/home';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendHome()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendHome$Response(params: {
    concern: number;
    unit: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.SendHomePath, 'post');
    if (params) {
      rb.path('concern', params.concern, {});
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
   * To access the full response (for headers, for example), `sendHome$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendHome(params: {
    concern: number;
    unit: number;
  }): Observable<void> {

    return this.sendHome$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation standby
   */
  static readonly StandbyPath = '/concerns/{concern}/units/{unit}/tasks/standby';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `standby()` instead.
   *
   * This method doesn't expect any request body.
   */
  standby$Response(params: {
    concern: number;
    unit: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.StandbyPath, 'post');
    if (params) {
      rb.path('concern', params.concern, {});
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
   * To access the full response (for headers, for example), `standby$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  standby(params: {
    concern: number;
    unit: number;
  }): Observable<void> {

    return this.standby$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
