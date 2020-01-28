/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { AuthApiConfiguration as __Configuration } from '../auth-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AuthResponseDto } from '../models/auth-response-dto';
import { AuthRequestDto } from '../models/auth-request-dto';

/**
 * Authentication Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class AuthenticationEndpointService extends __BaseService {
  static readonly getRequestTokenPath = '/authentication';
  static readonly authenticatePath = '/authentication';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  getRequestTokenResponse(): __Observable<__StrictHttpResponse<AuthResponseDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/authentication`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AuthResponseDto>;
      })
    );
  }
  /**
   * @return OK
   */
  getRequestToken(): __Observable<AuthResponseDto> {
    return this.getRequestTokenResponse().pipe(
      __map(_r => _r.body as AuthResponseDto)
    );
  }

  /**
   * @param authRequest authRequest
   * @return OK
   */
  authenticateResponse(authRequest: AuthRequestDto): __Observable<__StrictHttpResponse<AuthResponseDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = authRequest;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/authentication`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AuthResponseDto>;
      })
    );
  }
  /**
   * @param authRequest authRequest
   * @return OK
   */
  authenticate(authRequest: AuthRequestDto): __Observable<AuthResponseDto> {
    return this.authenticateResponse(authRequest).pipe(
      __map(_r => _r.body as AuthResponseDto)
    );
  }
}

module AuthenticationEndpointService {
}

export { AuthenticationEndpointService }
