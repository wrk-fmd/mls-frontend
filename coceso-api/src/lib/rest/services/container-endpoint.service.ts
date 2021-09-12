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

import { ContainerCreateDto } from '../models/container-create-dto';
import { ContainerDto } from '../models/container-dto';
import { ContainerUnitDto } from '../models/container-unit-dto';
import { ContainerUpdateDto } from '../models/container-update-dto';

@Injectable({
  providedIn: 'root',
})
export class ContainerEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllContainers
   */
  static readonly GetAllContainersPath = '/concerns/{concern}/container';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllContainers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllContainers$Response(params: {
    concern: number;
  }): Observable<StrictHttpResponse<Array<ContainerDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerEndpointService.GetAllContainersPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ContainerDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllContainers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllContainers(params: {
    concern: number;
  }): Observable<Array<ContainerDto>> {

    return this.getAllContainers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ContainerDto>>) => r.body as Array<ContainerDto>)
    );
  }

  /**
   * Path part for operation createContainer
   */
  static readonly CreateContainerPath = '/concerns/{concern}/container';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createContainer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createContainer$Response(params: {
    concern: number;
    body: ContainerCreateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerEndpointService.CreateContainerPath, 'post');
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
   * To access the full response (for headers, for example), `createContainer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createContainer(params: {
    concern: number;
    body: ContainerCreateDto
  }): Observable<void> {

    return this.createContainer$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateContainer
   */
  static readonly UpdateContainerPath = '/concerns/{concern}/container/{container}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateContainer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateContainer$Response(params: {
    concern: number;
    container: number;
    body: ContainerUpdateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerEndpointService.UpdateContainerPath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('container', params.container, {});
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
   * To access the full response (for headers, for example), `updateContainer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateContainer(params: {
    concern: number;
    container: number;
    body: ContainerUpdateDto
  }): Observable<void> {

    return this.updateContainer$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteContainer
   */
  static readonly DeleteContainerPath = '/concerns/{concern}/container/{container}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteContainer()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteContainer$Response(params: {
    concern: number;
    container: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerEndpointService.DeleteContainerPath, 'delete');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('container', params.container, {});
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
   * To access the full response (for headers, for example), `deleteContainer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteContainer(params: {
    concern: number;
    container: number;
  }): Observable<void> {

    return this.deleteContainer$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateContainerUnit
   */
  static readonly UpdateContainerUnitPath = '/concerns/{concern}/container/{container}/units/{unit}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateContainerUnit()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateContainerUnit$Response(params: {
    concern: number;
    container: number;
    unit: number;
    body: ContainerUnitDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerEndpointService.UpdateContainerUnitPath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('container', params.container, {});
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
   * To access the full response (for headers, for example), `updateContainerUnit$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateContainerUnit(params: {
    concern: number;
    container: number;
    unit: number;
    body: ContainerUnitDto
  }): Observable<void> {

    return this.updateContainerUnit$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeContainerUnit
   */
  static readonly RemoveContainerUnitPath = '/concerns/{concern}/container/{container}/units/{unit}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeContainerUnit()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeContainerUnit$Response(params: {
    concern: number;
    container: number;
    unit: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ContainerEndpointService.RemoveContainerUnitPath, 'delete');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('container', params.container, {});
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
   * To access the full response (for headers, for example), `removeContainerUnit$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeContainerUnit(params: {
    concern: number;
    container: number;
    unit: number;
  }): Observable<void> {

    return this.removeContainerUnit$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
