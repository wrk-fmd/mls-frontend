/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConcernBriefDto } from '../models/concern-brief-dto';
import { ConcernCreateDto } from '../models/concern-create-dto';
import { ConcernDto } from '../models/concern-dto';
import { ConcernUpdateDto } from '../models/concern-update-dto';
import { SectionCreateDto } from '../models/section-create-dto';

/**
 * Concern Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class ConcernEndpointService extends __BaseService {
  static readonly getAllConcernsPath = '/concerns';
  static readonly createConcernPath = '/concerns';
  static readonly getConcernPath = '/concerns/{concern}';
  static readonly updateConcernPath = '/concerns/{concern}';
  static readonly closeConcernPath = '/concerns/{concern}/close';
  static readonly openConcernPath = '/concerns/{concern}/open';
  static readonly addSectionPath = '/concerns/{concern}/sections';
  static readonly removeSectionPath = '/concerns/{concern}/sections/{section}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getAllConcernsResponse(): __Observable<__StrictHttpResponse<Array<ConcernBriefDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConcernBriefDto>>;
      })
    );
  }
  /**
   * @return OK
   */
  getAllConcerns(): __Observable<Array<ConcernBriefDto>> {
    return this.getAllConcernsResponse().pipe(
      __map(_r => _r.body as Array<ConcernBriefDto>)
    );
  }

  /**
   * @param data data
   * @return OK
   */
  createConcernResponse(data: ConcernCreateDto): __Observable<__StrictHttpResponse<ConcernBriefDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConcernBriefDto>;
      })
    );
  }
  /**
   * @param data data
   * @return OK
   */
  createConcern(data: ConcernCreateDto): __Observable<ConcernBriefDto> {
    return this.createConcernResponse(data).pipe(
      __map(_r => _r.body as ConcernBriefDto)
    );
  }

  /**
   * @param concern concern
   * @return OK
   */
  getConcernResponse(concern: number): __Observable<__StrictHttpResponse<ConcernDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${concern}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConcernDto>;
      })
    );
  }
  /**
   * @param concern concern
   * @return OK
   */
  getConcern(concern: number): __Observable<ConcernDto> {
    return this.getConcernResponse(concern).pipe(
      __map(_r => _r.body as ConcernDto)
    );
  }

  /**
   * @param params The `ConcernEndpointService.UpdateConcernParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  updateConcernResponse(params: ConcernEndpointService.UpdateConcernParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.data;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${params.concern}`,
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
   * @param params The `ConcernEndpointService.UpdateConcernParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  updateConcern(params: ConcernEndpointService.UpdateConcernParams): __Observable<null> {
    return this.updateConcernResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param concern concern
   */
  closeConcernResponse(concern: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${concern}/close`,
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
   * @param concern concern
   */
  closeConcern(concern: number): __Observable<null> {
    return this.closeConcernResponse(concern).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param concern concern
   */
  openConcernResponse(concern: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concerns/${concern}/open`,
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
   * @param concern concern
   */
  openConcern(concern: number): __Observable<null> {
    return this.openConcernResponse(concern).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ConcernEndpointService.AddSectionParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  addSectionResponse(params: ConcernEndpointService.AddSectionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.data;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concerns/${params.concern}/sections`,
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
   * @param params The `ConcernEndpointService.AddSectionParams` containing the following parameters:
   *
   * - `data`: data
   *
   * - `concern`: concern
   */
  addSection(params: ConcernEndpointService.AddSectionParams): __Observable<null> {
    return this.addSectionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ConcernEndpointService.RemoveSectionParams` containing the following parameters:
   *
   * - `section`: section
   *
   * - `concern`: concern
   */
  removeSectionResponse(params: ConcernEndpointService.RemoveSectionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/concerns/${params.concern}/sections/${params.section}`,
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
   * @param params The `ConcernEndpointService.RemoveSectionParams` containing the following parameters:
   *
   * - `section`: section
   *
   * - `concern`: concern
   */
  removeSection(params: ConcernEndpointService.RemoveSectionParams): __Observable<null> {
    return this.removeSectionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ConcernEndpointService {

  /**
   * Parameters for updateConcern
   */
  export interface UpdateConcernParams {

    /**
     * data
     */
    data: ConcernUpdateDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for addSection
   */
  export interface AddSectionParams {

    /**
     * data
     */
    data: SectionCreateDto;

    /**
     * concern
     */
    concern: number;
  }

  /**
   * Parameters for removeSection
   */
  export interface RemoveSectionParams {

    /**
     * section
     */
    section: string;

    /**
     * concern
     */
    concern: number;
  }
}

export { ConcernEndpointService }
