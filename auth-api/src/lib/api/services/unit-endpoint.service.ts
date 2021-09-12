/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { AuthApiConfiguration } from '../auth-api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { UnitTokenDto } from '../models/unit-token-dto';

@Injectable({
  providedIn: 'root',
})
export class UnitEndpointService extends BaseService {
  constructor(
    config: AuthApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTokens
   */
  static readonly GetTokensPath = '/concerns/{concern}/units/tokens';

  /**
   * Gets all units for a concern with tokens.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTokens()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTokens$Response(params: {
    concern: number;
    expiration?: number;
  }): Observable<StrictHttpResponse<Array<UnitTokenDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UnitEndpointService.GetTokensPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.query('expiration', params.expiration, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UnitTokenDto>>;
      })
    );
  }

  /**
   * Gets all units for a concern with tokens.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTokens$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTokens(params: {
    concern: number;
    expiration?: number;
  }): Observable<Array<UnitTokenDto>> {

    return this.getTokens$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UnitTokenDto>>) => r.body as Array<UnitTokenDto>)
    );
  }

}
