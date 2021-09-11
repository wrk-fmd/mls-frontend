/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UnitDto } from '../models/unit-dto';
import { UnitBriefDto } from '../models/unit-brief-dto';
import { UnitCreateDto } from '../models/unit-create-dto';
import { UnitBatchCreateDto } from '../models/unit-batch-create-dto';
import { UnitUpdateDto } from '../models/unit-update-dto';
import { SendMessageDto } from '../models/send-message-dto';

/**
 * Unit Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class UnitEndpointService extends __BaseService {
  static readonly getAllUnitsPath = '/concerns/{concern}/units';
  static readonly createUnitPath = '/concerns/{concern}/units';
  static readonly createUnitsBatchPath = '/concerns/{concern}/units/batch';
  static readonly updateUnitPath = '/concerns/{concern}/units/{unit}';
  static readonly removeUnitPath = '/concerns/{concern}/units/{unit}';
  static readonly assignCrewMemberPath = '/concerns/{concern}/units/{unit}/crew/{member}';
  static readonly removeCrewMemberPath = '/concerns/{concern}/units/{unit}/crew/{member}';
  static readonly sendMessagePath = '/concerns/{concern}/units/{unit}/message';
  static readonly holdPositionPath = '/concerns/{concern}/units/{unit}/tasks/holdPosition';
  static readonly sendHomePath = '/concerns/{concern}/units/{unit}/tasks/home';
  static readonly standbyPath = '/concerns/{concern}/units/{unit}/tasks/standby';

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
  getAllUnitsResponse(concern: number): __Observable<__StrictHttpResponse<Array<UnitDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${concern}/units`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UnitDto>>;
      })
    );
  }
  /**
   * @param concern concern
   * @return OK
   */
  getAllUnits(concern: number): __Observable<Array<UnitDto>> {
    return this.getAllUnitsResponse(concern).pipe(
      __map(_r => _r.body as Array<UnitDto>)
    );
  }

  /**
   * @param params The `UnitEndpointService.CreateUnitParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   *
   * @return OK
   */
  createUnitResponse(params: UnitEndpointService.CreateUnitParams): __Observable<__StrictHttpResponse<UnitBriefDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.data;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/units`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UnitBriefDto>;
      })
    );
  }
  /**
   * @param params The `UnitEndpointService.CreateUnitParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   *
   * @return OK
   */
  createUnit(params: UnitEndpointService.CreateUnitParams): __Observable<UnitBriefDto> {
    return this.createUnitResponse(params).pipe(
      __map(_r => _r.body as UnitBriefDto)
    );
  }

  /**
   * @param params The `UnitEndpointService.CreateUnitsBatchParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   *
   * @return OK
   */
  createUnitsBatchResponse(params: UnitEndpointService.CreateUnitsBatchParams): __Observable<__StrictHttpResponse<Array<UnitBriefDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.data;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/units/batch`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UnitBriefDto>>;
      })
    );
  }
  /**
   * @param params The `UnitEndpointService.CreateUnitsBatchParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   *
   * @return OK
   */
  createUnitsBatch(params: UnitEndpointService.CreateUnitsBatchParams): __Observable<Array<UnitBriefDto>> {
    return this.createUnitsBatchResponse(params).pipe(
      __map(_r => _r.body as Array<UnitBriefDto>)
    );
  }

  /**
   * @param params The `UnitEndpointService.UpdateUnitParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  updateUnitResponse(params: UnitEndpointService.UpdateUnitParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}/units/${params.unit}`,
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
   * @param params The `UnitEndpointService.UpdateUnitParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  updateUnit(params: UnitEndpointService.UpdateUnitParams): __Observable<null> {
    return this.updateUnitResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UnitEndpointService.RemoveUnitParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `concern`: concern
   */
  removeUnitResponse(params: UnitEndpointService.RemoveUnitParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/concerns/${params.concern}/units/${params.unit}`,
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
   * @param params The `UnitEndpointService.RemoveUnitParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `concern`: concern
   */
  removeUnit(params: UnitEndpointService.RemoveUnitParams): __Observable<null> {
    return this.removeUnitResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UnitEndpointService.AssignCrewMemberParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `member`: member
   *
   * - `concern`: concern
   */
  assignCrewMemberResponse(params: UnitEndpointService.AssignCrewMemberParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}/units/${params.unit}/crew/${params.member}`,
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
   * @param params The `UnitEndpointService.AssignCrewMemberParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `member`: member
   *
   * - `concern`: concern
   */
  assignCrewMember(params: UnitEndpointService.AssignCrewMemberParams): __Observable<null> {
    return this.assignCrewMemberResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UnitEndpointService.RemoveCrewMemberParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `member`: member
   *
   * - `concern`: concern
   */
  removeCrewMemberResponse(params: UnitEndpointService.RemoveCrewMemberParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/concerns/${params.concern}/units/${params.unit}/crew/${params.member}`,
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
   * @param params The `UnitEndpointService.RemoveCrewMemberParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `member`: member
   *
   * - `concern`: concern
   */
  removeCrewMember(params: UnitEndpointService.RemoveCrewMemberParams): __Observable<null> {
    return this.removeCrewMemberResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UnitEndpointService.SendMessageParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  sendMessageResponse(params: UnitEndpointService.SendMessageParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}/units/${params.unit}/message`,
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
   * @param params The `UnitEndpointService.SendMessageParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  sendMessage(params: UnitEndpointService.SendMessageParams): __Observable<null> {
    return this.sendMessageResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UnitEndpointService.HoldPositionParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `concern`: concern
   */
  holdPositionResponse(params: UnitEndpointService.HoldPositionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/units/${params.unit}/tasks/holdPosition`,
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
   * @param params The `UnitEndpointService.HoldPositionParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `concern`: concern
   */
  holdPosition(params: UnitEndpointService.HoldPositionParams): __Observable<null> {
    return this.holdPositionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UnitEndpointService.SendHomeParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `concern`: concern
   */
  sendHomeResponse(params: UnitEndpointService.SendHomeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/units/${params.unit}/tasks/home`,
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
   * @param params The `UnitEndpointService.SendHomeParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `concern`: concern
   */
  sendHome(params: UnitEndpointService.SendHomeParams): __Observable<null> {
    return this.sendHomeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UnitEndpointService.StandbyParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `concern`: concern
   */
  standbyResponse(params: UnitEndpointService.StandbyParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/units/${params.unit}/tasks/standby`,
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
   * @param params The `UnitEndpointService.StandbyParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `concern`: concern
   */
  standby(params: UnitEndpointService.StandbyParams): __Observable<null> {
    return this.standbyResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module UnitEndpointService {

  /**
   * Parameters for createUnit
   */
  export interface CreateUnitParams {

    /**
     * data
     */
    data: UnitCreateDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for createUnitsBatch
   */
  export interface CreateUnitsBatchParams {

    /**
     * data
     */
    data: UnitBatchCreateDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for updateUnit
   */
  export interface UpdateUnitParams {

    /**
     * unit
     */
    unit: number;

    /**
     * data
     */
    data: UnitUpdateDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for removeUnit
   */
  export interface RemoveUnitParams {

    /**
     * unit
     */
    unit: number;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for assignCrewMember
   */
  export interface AssignCrewMemberParams {

    /**
     * unit
     */
    unit: number;

    /**
     * member
     */
    member: number;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for removeCrewMember
   */
  export interface RemoveCrewMemberParams {

    /**
     * unit
     */
    unit: number;

    /**
     * member
     */
    member: number;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for sendMessage
   */
  export interface SendMessageParams {

    /**
     * unit
     */
    unit: number;

    /**
     * data
     */
    data: SendMessageDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for holdPosition
   */
  export interface HoldPositionParams {

    /**
     * unit
     */
    unit: number;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for sendHome
   */
  export interface SendHomeParams {

    /**
     * unit
     */
    unit: number;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for standby
   */
  export interface StandbyParams {

    /**
     * unit
     */
    unit: number;

    /**
     * concern
     */
    concern: number;
  }
}

export { UnitEndpointService }
