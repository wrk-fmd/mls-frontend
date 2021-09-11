/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { CocesoRestConfiguration as __Configuration } from '../coceso-rest-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { MessageChannelDto } from '../models/message-channel-dto';
import { ReceivedMessageDto } from '../models/received-message-dto';

/**
 * Message Endpoint
 */
@Injectable({
  providedIn: 'root',
})
class MessageEndpointService extends __BaseService {
  static readonly getChannelsPath = '/concerns/{concern}/messages/channels';
  static readonly getLastMessagePath = '/concerns/{concern}/messages/{minutes}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param concern concern
   * @return OK
   */
  getChannelsResponse(concern: number): __Observable<__StrictHttpResponse<Array<MessageChannelDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${concern}/messages/channels`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<MessageChannelDto>>;
      })
    );
  }
  /**
   * @param concern concern
   * @return OK
   */
  getChannels(concern: number): __Observable<Array<MessageChannelDto>> {
    return this.getChannelsResponse(concern).pipe(
      __map(_r => _r.body as Array<MessageChannelDto>)
    );
  }

  /**
   * @param params The `MessageEndpointService.GetLastMessageParams` containing the following parameters:
   *
   * - `minutes`: minutes
   *
   * - `concern`: concern
   *
   * @return OK
   */
  getLastMessageResponse(params: MessageEndpointService.GetLastMessageParams): __Observable<__StrictHttpResponse<Array<ReceivedMessageDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concerns/${params.concern}/messages/${params.minutes}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ReceivedMessageDto>>;
      })
    );
  }
  /**
   * @param params The `MessageEndpointService.GetLastMessageParams` containing the following parameters:
   *
   * - `minutes`: minutes
   *
   * - `concern`: concern
   *
   * @return OK
   */
  getLastMessage(params: MessageEndpointService.GetLastMessageParams): __Observable<Array<ReceivedMessageDto>> {
    return this.getLastMessageResponse(params).pipe(
      __map(_r => _r.body as Array<ReceivedMessageDto>)
    );
  }
}

module MessageEndpointService {

  /**
   * Parameters for getLastMessage
   */
  export interface GetLastMessageParams {

    /**
     * minutes
     */
    minutes: number;

    /**
     * concern
     */
    concern: number;
  }
}

export { MessageEndpointService }
