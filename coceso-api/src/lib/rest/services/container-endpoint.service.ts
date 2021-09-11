/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ContainerDto } from '../models/container-dto';
import { ContainerCreateDto } from '../models/container-create-dto';
import { ContainerUpdateDto } from '../models/container-update-dto';
import { ContainerUnitDto } from '../models/container-unit-dto';

/**
 * Container Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class ContainerEndpointService extends __BaseService {
  static readonly getAllContainersPath = '/concerns/{concern}/container';
  static readonly createContainerPath = '/concerns/{concern}/container';
  static readonly updateContainerPath = '/concerns/{concern}/container/{container}';
  static readonly deleteContainerPath = '/concerns/{concern}/container/{container}';
  static readonly updateContainerUnitPath = '/concerns/{concern}/container/{container}/units/{unit}';
  static readonly removeContainerUnitPath = '/concerns/{concern}/container/{container}/units/{unit}';

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
  getAllContainersResponse(concern: number): __Observable<__StrictHttpResponse<Array<ContainerDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${concern}/container`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ContainerDto>>;
      })
    );
  }
  /**
   * @param concern concern
   * @return OK
   */
  getAllContainers(concern: number): __Observable<Array<ContainerDto>> {
    return this.getAllContainersResponse(concern).pipe(
      __map(_r => _r.body as Array<ContainerDto>)
    );
  }

  /**
   * @param params The `ContainerEndpointService.CreateContainerParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  createContainerResponse(params: ContainerEndpointService.CreateContainerParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.data;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/container`,
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
   * @param params The `ContainerEndpointService.CreateContainerParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  createContainer(params: ContainerEndpointService.CreateContainerParams): __Observable<null> {
    return this.createContainerResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ContainerEndpointService.UpdateContainerParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `container`: container
   *
   * - `concern`: concern
   */
  updateContainerResponse(params: ContainerEndpointService.UpdateContainerParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.data;


    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}/container/${params.container}`,
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
   * @param params The `ContainerEndpointService.UpdateContainerParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `container`: container
   *
   * - `concern`: concern
   */
  updateContainer(params: ContainerEndpointService.UpdateContainerParams): __Observable<null> {
    return this.updateContainerResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ContainerEndpointService.DeleteContainerParams` containing the following parameters:
   *
   * - `container`: container
   *
   * - `concern`: concern
   */
  deleteContainerResponse(params: ContainerEndpointService.DeleteContainerParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/concerns/${params.concern}/container/${params.container}`,
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
   * @param params The `ContainerEndpointService.DeleteContainerParams` containing the following parameters:
   *
   * - `container`: container
   *
   * - `concern`: concern
   */
  deleteContainer(params: ContainerEndpointService.DeleteContainerParams): __Observable<null> {
    return this.deleteContainerResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ContainerEndpointService.UpdateContainerUnitParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `data`: data
   *
   * - `container`: container
   *
   * - `concern`: concern
   */
  updateContainerUnitResponse(params: ContainerEndpointService.UpdateContainerUnitParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;


    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}/container/${params.container}/units/${params.unit}`,
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
   * @param params The `ContainerEndpointService.UpdateContainerUnitParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `data`: data
   *
   * - `container`: container
   *
   * - `concern`: concern
   */
  updateContainerUnit(params: ContainerEndpointService.UpdateContainerUnitParams): __Observable<null> {
    return this.updateContainerUnitResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ContainerEndpointService.RemoveContainerUnitParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `container`: container
   *
   * - `concern`: concern
   */
  removeContainerUnitResponse(params: ContainerEndpointService.RemoveContainerUnitParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/concerns/${params.concern}/container/${params.container}/units/${params.unit}`,
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
   * @param params The `ContainerEndpointService.RemoveContainerUnitParams` containing the following parameters:
   *
   * - `unit`: unit
   *
   * - `container`: container
   *
   * - `concern`: concern
   */
  removeContainerUnit(params: ContainerEndpointService.RemoveContainerUnitParams): __Observable<null> {
    return this.removeContainerUnitResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ContainerEndpointService {

  /**
   * Parameters for createContainer
   */
  export interface CreateContainerParams {

    /**
     * data
     */
    data: ContainerCreateDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for updateContainer
   */
  export interface UpdateContainerParams {

    /**
     * data
     */
    data: ContainerUpdateDto;

    /**
     * container
     */
    container: number;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for deleteContainer
   */
  export interface DeleteContainerParams {

    /**
     * container
     */
    container: number;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for updateContainerUnit
   */
  export interface UpdateContainerUnitParams {

    /**
     * unit
     */
    unit: number;

    /**
     * data
     */
    data: ContainerUnitDto;

    /**
     * container
     */
    container: number;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for removeContainerUnit
   */
  export interface RemoveContainerUnitParams {

    /**
     * unit
     */
    unit: number;

    /**
     * container
     */
    container: number;

    /**
     * concern
     */
    concern: number;
  }
}

export { ContainerEndpointService }
