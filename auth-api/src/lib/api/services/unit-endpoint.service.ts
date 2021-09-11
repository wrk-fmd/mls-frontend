/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { AuthApiConfiguration as __Configuration } from '../auth-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UnitTokenDto } from '../models/unit-token-dto';

/**
 * Unit Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class UnitEndpointService extends __BaseService {
  static readonly getTokensPath = '/concerns/{concern}/units/tokens';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `UnitEndpointService.GetTokensParams` containing the following parameters:
   *
   * - `concern`: concern
   *
   * - `expiration`: expiration
   *
   * @return OK
   */
  getTokensResponse(params: UnitEndpointService.GetTokensParams): __Observable<__StrictHttpResponse<Array<UnitTokenDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.expiration != null) __params = __params.set('expiration', params.expiration.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${params.concern}/units/tokens`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UnitTokenDto>>;
      })
    );
  }
  /**
   * @param params The `UnitEndpointService.GetTokensParams` containing the following parameters:
   *
   * - `concern`: concern
   *
   * - `expiration`: expiration
   *
   * @return OK
   */
  getTokens(params: UnitEndpointService.GetTokensParams): __Observable<Array<UnitTokenDto>> {
    return this.getTokensResponse(params).pipe(
      __map(_r => _r.body as Array<UnitTokenDto>)
    );
  }
}

module UnitEndpointService {

  /**
   * Parameters for getTokens
   */
  export interface GetTokensParams {

    /**
     * concern
     */
    concern: number;

    /**
     * expiration
     */
    expiration?: string;
  }
}

export { UnitEndpointService }
