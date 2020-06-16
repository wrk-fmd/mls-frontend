/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PageStaffMemberDto } from '../models/page-staff-member-dto';
import { StaffMemberDto } from '../models/staff-member-dto';
import { StaffMemberCreateDto } from '../models/staff-member-create-dto';
import { StaffMemberUpdateDto } from '../models/staff-member-update-dto';

/**
 * Staff Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class StaffEndpointService extends __BaseService {
  static readonly getAllStaffPath = '/staff';
  static readonly createStaffMemberPath = '/staff';
  static readonly updateStaffMemberPath = '/staff/{staffMember}';
  static readonly removeStaffMemberPath = '/staff/{staffMember}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `StaffEndpointService.GetAllStaffParams` containing the following parameters:
   *
   * - `unpaged`:
   *
   * - `sort.unsorted`:
   *
   * - `sort.sorted`:
   *
   * - `paged`:
   *
   * - `pageSize`:
   *
   * - `pageNumber`:
   *
   * - `offset`:
   *
   * - `filter`: filter
   *
   * @return OK
   */
  getAllStaffResponse(params: StaffEndpointService.GetAllStaffParams): __Observable<__StrictHttpResponse<PageStaffMemberDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.unpaged != null) __params = __params.set('unpaged', params.unpaged.toString());
    if (params.sortUnsorted != null) __params = __params.set('sort.unsorted', params.sortUnsorted.toString());
    if (params.sortSorted != null) __params = __params.set('sort.sorted', params.sortSorted.toString());
    if (params.paged != null) __params = __params.set('paged', params.paged.toString());
    if (params.pageSize != null) __params = __params.set('pageSize', params.pageSize.toString());
    if (params.pageNumber != null) __params = __params.set('pageNumber', params.pageNumber.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/staff`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageStaffMemberDto>;
      })
    );
  }
  /**
   * @param params The `StaffEndpointService.GetAllStaffParams` containing the following parameters:
   *
   * - `unpaged`:
   *
   * - `sort.unsorted`:
   *
   * - `sort.sorted`:
   *
   * - `paged`:
   *
   * - `pageSize`:
   *
   * - `pageNumber`:
   *
   * - `offset`:
   *
   * - `filter`: filter
   *
   * @return OK
   */
  getAllStaff(params: StaffEndpointService.GetAllStaffParams): __Observable<PageStaffMemberDto> {
    return this.getAllStaffResponse(params).pipe(
      __map(_r => _r.body as PageStaffMemberDto)
    );
  }

  /**
   * @param data data
   * @return OK
   */
  createStaffMemberResponse(data: StaffMemberCreateDto): __Observable<__StrictHttpResponse<StaffMemberDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/staff`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StaffMemberDto>;
      })
    );
  }
  /**
   * @param data data
   * @return OK
   */
  createStaffMember(data: StaffMemberCreateDto): __Observable<StaffMemberDto> {
    return this.createStaffMemberResponse(data).pipe(
      __map(_r => _r.body as StaffMemberDto)
    );
  }

  /**
   * @param params The `StaffEndpointService.UpdateStaffMemberParams` containing the following parameters:
   *
   * - `staffMember`: staffMember
   *
   * - `data`: data
   */
  updateStaffMemberResponse(params: StaffEndpointService.UpdateStaffMemberParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/staff/${params.staffMember}`,
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
   * @param params The `StaffEndpointService.UpdateStaffMemberParams` containing the following parameters:
   *
   * - `staffMember`: staffMember
   *
   * - `data`: data
   */
  updateStaffMember(params: StaffEndpointService.UpdateStaffMemberParams): __Observable<null> {
    return this.updateStaffMemberResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param staffMember staffMember
   */
  removeStaffMemberResponse(staffMember: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/staff/${staffMember}`,
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
   * @param staffMember staffMember
   */
  removeStaffMember(staffMember: number): __Observable<null> {
    return this.removeStaffMemberResponse(staffMember).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module StaffEndpointService {

  /**
   * Parameters for getAllStaff
   */
  export interface GetAllStaffParams {
    unpaged?: boolean;
    sortUnsorted?: boolean;
    sortSorted?: boolean;
    paged?: boolean;
    pageSize?: number;
    pageNumber?: number;
    offset?: number;

    /**
     * filter
     */
    filter?: string;
  }

  /**
   * Parameters for updateStaffMember
   */
  export interface UpdateStaffMemberParams {

    /**
     * staffMember
     */
    staffMember: number;

    /**
     * data
     */
    data: StaffMemberUpdateDto;
  }
}

export { StaffEndpointService }
