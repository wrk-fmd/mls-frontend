/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoApiConfiguration as __Configuration } from '../coceso-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Task Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class TaskEndpointService extends __BaseService {
  static readonly assignPath = '/concerns/{concern}/incidents/{incident}/units/{unit}';
  static readonly updateStatePath = '/concerns/{concern}/incidents/{incident}/units/{unit}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `TaskEndpointService.AssignParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `incident`: incident
   *
   * - `concern`: concern
   */
  assignResponse(params: TaskEndpointService.AssignParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/incidents/${params.incident}/units/${params.unit}`,
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
   * @param params The `TaskEndpointService.AssignParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `incident`: incident
   *
   * - `concern`: concern
   */
  assign(params: TaskEndpointService.AssignParams): __Observable<null> {
    return this.assignResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `TaskEndpointService.UpdateStateParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `state`: state
   *
   * - `incident`: incident
   *
   * - `concern`: concern
   */
  updateStateResponse(params: TaskEndpointService.UpdateStateParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.state;


    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}/incidents/${params.incident}/units/${params.unit}`,
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
   * @param params The `TaskEndpointService.UpdateStateParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `state`: state
   *
   * - `incident`: incident
   *
   * - `concern`: concern
   */
  updateState(params: TaskEndpointService.UpdateStateParams): __Observable<null> {
    return this.updateStateResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module TaskEndpointService {

  /**
   * Parameters for assign
   */
  export interface AssignParams {

    /**
     * unit
     */
    unit: number;

    /**
     * incident
     */
    incident: number;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for updateState
   */
  export interface UpdateStateParams {

    /**
     * unit
     */
    unit: number;

    /**
     * state
     */
    state: 'Assigned' | 'ZBO' | 'ABO' | 'ZAO' | 'AAO' | 'Detached';

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

export { TaskEndpointService }
