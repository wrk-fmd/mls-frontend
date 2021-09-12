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

import { ConcernBriefDto } from '../models/concern-brief-dto';
import { ConcernCreateDto } from '../models/concern-create-dto';
import { ConcernDto } from '../models/concern-dto';
import { ConcernUpdateDto } from '../models/concern-update-dto';
import { SectionCreateDto } from '../models/section-create-dto';

@Injectable({
  providedIn: 'root',
})
export class ConcernEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllConcerns
   */
  static readonly GetAllConcernsPath = '/concerns';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllConcerns()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllConcerns$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ConcernBriefDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ConcernEndpointService.GetAllConcernsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ConcernBriefDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllConcerns$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllConcerns(params?: {
  }): Observable<Array<ConcernBriefDto>> {

    return this.getAllConcerns$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ConcernBriefDto>>) => r.body as Array<ConcernBriefDto>)
    );
  }

  /**
   * Path part for operation createConcern
   */
  static readonly CreateConcernPath = '/concerns';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createConcern()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createConcern$Response(params: {
    body: ConcernCreateDto
  }): Observable<StrictHttpResponse<ConcernBriefDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConcernEndpointService.CreateConcernPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConcernBriefDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createConcern$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createConcern(params: {
    body: ConcernCreateDto
  }): Observable<ConcernBriefDto> {

    return this.createConcern$Response(params).pipe(
      map((r: StrictHttpResponse<ConcernBriefDto>) => r.body as ConcernBriefDto)
    );
  }

  /**
   * Path part for operation getConcern
   */
  static readonly GetConcernPath = '/concerns/{concern}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConcern()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConcern$Response(params: {
    concern: number;
  }): Observable<StrictHttpResponse<ConcernDto>> {

    const rb = new RequestBuilder(this.rootUrl, ConcernEndpointService.GetConcernPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ConcernDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConcern$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConcern(params: {
    concern: number;
  }): Observable<ConcernDto> {

    return this.getConcern$Response(params).pipe(
      map((r: StrictHttpResponse<ConcernDto>) => r.body as ConcernDto)
    );
  }

  /**
   * Path part for operation updateConcern
   */
  static readonly UpdateConcernPath = '/concerns/{concern}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateConcern()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateConcern$Response(params: {
    concern: number;
    body: ConcernUpdateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConcernEndpointService.UpdateConcernPath, 'put');
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
   * To access the full response (for headers, for example), `updateConcern$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateConcern(params: {
    concern: number;
    body: ConcernUpdateDto
  }): Observable<void> {

    return this.updateConcern$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation closeConcern
   */
  static readonly CloseConcernPath = '/concerns/{concern}/close';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `closeConcern()` instead.
   *
   * This method doesn't expect any request body.
   */
  closeConcern$Response(params: {
    concern: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConcernEndpointService.CloseConcernPath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
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
   * To access the full response (for headers, for example), `closeConcern$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  closeConcern(params: {
    concern: number;
  }): Observable<void> {

    return this.closeConcern$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation openConcern
   */
  static readonly OpenConcernPath = '/concerns/{concern}/open';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `openConcern()` instead.
   *
   * This method doesn't expect any request body.
   */
  openConcern$Response(params: {
    concern: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConcernEndpointService.OpenConcernPath, 'put');
    if (params) {
      rb.path('concern', params.concern, {});
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
   * To access the full response (for headers, for example), `openConcern$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  openConcern(params: {
    concern: number;
  }): Observable<void> {

    return this.openConcern$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addSection
   */
  static readonly AddSectionPath = '/concerns/{concern}/sections';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSection()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSection$Response(params: {
    concern: number;
    body: SectionCreateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConcernEndpointService.AddSectionPath, 'post');
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
   * To access the full response (for headers, for example), `addSection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSection(params: {
    concern: number;
    body: SectionCreateDto
  }): Observable<void> {

    return this.addSection$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeSection
   */
  static readonly RemoveSectionPath = '/concerns/{concern}/sections/{section}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeSection()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeSection$Response(params: {
    concern: number;
    section: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ConcernEndpointService.RemoveSectionPath, 'delete');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('section', params.section, {});
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
   * To access the full response (for headers, for example), `removeSection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeSection(params: {
    concern: number;
    section: string;
  }): Observable<void> {

    return this.removeSection$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
