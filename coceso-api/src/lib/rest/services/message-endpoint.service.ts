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

import { MessageChannelDto } from '../models/message-channel-dto';
import { ReceivedMessageDto } from '../models/received-message-dto';

@Injectable({
  providedIn: 'root',
})
export class MessageEndpointService extends BaseService {
  constructor(
    config: CocesoRestConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getChannels
   */
  static readonly GetChannelsPath = '/concerns/{concern}/messages/channels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChannels()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChannels$Response(params: {
    concern: number;
  }): Observable<StrictHttpResponse<Array<MessageChannelDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MessageEndpointService.GetChannelsPath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MessageChannelDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getChannels$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChannels(params: {
    concern: number;
  }): Observable<Array<MessageChannelDto>> {

    return this.getChannels$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MessageChannelDto>>) => r.body as Array<MessageChannelDto>)
    );
  }

  /**
   * Path part for operation getLastMessage
   */
  static readonly GetLastMessagePath = '/concerns/{concern}/messages/{minutes}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLastMessage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastMessage$Response(params: {
    concern: number;
    minutes: number;
  }): Observable<StrictHttpResponse<Array<ReceivedMessageDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MessageEndpointService.GetLastMessagePath, 'get');
    if (params) {
      rb.path('concern', params.concern, {});
      rb.path('minutes', params.minutes, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ReceivedMessageDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLastMessage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastMessage(params: {
    concern: number;
    minutes: number;
  }): Observable<Array<ReceivedMessageDto>> {

    return this.getLastMessage$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ReceivedMessageDto>>) => r.body as Array<ReceivedMessageDto>)
    );
  }

}
