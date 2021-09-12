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

import { AuthRequestDto } from '../models/auth-request-dto';
import { AuthResponseDto } from '../models/auth-response-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationEndpointService extends BaseService {
  constructor(
    config: AuthApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getRequestToken
   */
  static readonly GetRequestTokenPath = '/authentication';

  /**
   * Returns an authentication token for normal requests based on a given renewal token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRequestToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRequestToken$Response(params?: {
  }): Observable<StrictHttpResponse<AuthResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationEndpointService.GetRequestTokenPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResponseDto>;
      })
    );
  }

  /**
   * Returns an authentication token for normal requests based on a given renewal token.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRequestToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRequestToken(params?: {
  }): Observable<AuthResponseDto> {

    return this.getRequestToken$Response(params).pipe(
      map((r: StrictHttpResponse<AuthResponseDto>) => r.body as AuthResponseDto)
    );
  }

  /**
   * Path part for operation authenticate
   */
  static readonly AuthenticatePath = '/authentication';

  /**
   * Authenticates a user with username and password as credentials.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: {
    body: AuthRequestDto
  }): Observable<StrictHttpResponse<AuthResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationEndpointService.AuthenticatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResponseDto>;
      })
    );
  }

  /**
   * Authenticates a user with username and password as credentials.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: {
    body: AuthRequestDto
  }): Observable<AuthResponseDto> {

    return this.authenticate$Response(params).pipe(
      map((r: StrictHttpResponse<AuthResponseDto>) => r.body as AuthResponseDto)
    );
  }

}
