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

import { PageStaffMemberBriefDto } from '../models/page-staff-member-brief-dto';
import { StaffMemberBriefDto } from '../models/staff-member-brief-dto';
import { StaffMemberCreateDto } from '../models/staff-member-create-dto';
import { StaffMemberDto } from '../models/staff-member-dto';
import { StaffMemberUpdateDto } from '../models/staff-member-update-dto';

@Injectable({
  providedIn: 'root',
})
export class StaffEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllStaff
   */
  static readonly GetAllStaffPath = '/staff';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStaff()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStaff$Response(params?: {

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
    filter?: string;
  }): Observable<StrictHttpResponse<PageStaffMemberBriefDto>> {

    const rb = new RequestBuilder(this.rootUrl, StaffEndpointService.GetAllStaffPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageStaffMemberBriefDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllStaff$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStaff(params?: {

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
    filter?: string;
  }): Observable<PageStaffMemberBriefDto> {

    return this.getAllStaff$Response(params).pipe(
      map((r: StrictHttpResponse<PageStaffMemberBriefDto>) => r.body as PageStaffMemberBriefDto)
    );
  }

  /**
   * Path part for operation createStaffMember
   */
  static readonly CreateStaffMemberPath = '/staff';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createStaffMember()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createStaffMember$Response(params: {
    body: StaffMemberCreateDto
  }): Observable<StrictHttpResponse<StaffMemberBriefDto>> {

    const rb = new RequestBuilder(this.rootUrl, StaffEndpointService.CreateStaffMemberPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StaffMemberBriefDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createStaffMember$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createStaffMember(params: {
    body: StaffMemberCreateDto
  }): Observable<StaffMemberBriefDto> {

    return this.createStaffMember$Response(params).pipe(
      map((r: StrictHttpResponse<StaffMemberBriefDto>) => r.body as StaffMemberBriefDto)
    );
  }

  /**
   * Path part for operation getStaffMember
   */
  static readonly GetStaffMemberPath = '/staff/{staffMember}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStaffMember()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStaffMember$Response(params: {
    staffMember: number;
  }): Observable<StrictHttpResponse<StaffMemberDto>> {

    const rb = new RequestBuilder(this.rootUrl, StaffEndpointService.GetStaffMemberPath, 'get');
    if (params) {
      rb.path('staffMember', params.staffMember, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StaffMemberDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStaffMember$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStaffMember(params: {
    staffMember: number;
  }): Observable<StaffMemberDto> {

    return this.getStaffMember$Response(params).pipe(
      map((r: StrictHttpResponse<StaffMemberDto>) => r.body as StaffMemberDto)
    );
  }

  /**
   * Path part for operation updateStaffMember
   */
  static readonly UpdateStaffMemberPath = '/staff/{staffMember}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStaffMember()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStaffMember$Response(params: {
    staffMember: number;
    body: StaffMemberUpdateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, StaffEndpointService.UpdateStaffMemberPath, 'put');
    if (params) {
      rb.path('staffMember', params.staffMember, {});
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
   * To access the full response (for headers, for example), `updateStaffMember$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStaffMember(params: {
    staffMember: number;
    body: StaffMemberUpdateDto
  }): Observable<void> {

    return this.updateStaffMember$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeStaffMember
   */
  static readonly RemoveStaffMemberPath = '/staff/{staffMember}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeStaffMember()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeStaffMember$Response(params: {
    staffMember: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, StaffEndpointService.RemoveStaffMemberPath, 'delete');
    if (params) {
      rb.path('staffMember', params.staffMember, {});
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
   * To access the full response (for headers, for example), `removeStaffMember$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeStaffMember(params: {
    staffMember: number;
  }): Observable<void> {

    return this.removeStaffMember$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
