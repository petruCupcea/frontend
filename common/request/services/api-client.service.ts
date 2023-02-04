import * as _ from 'lodash';
import { catchError, finalize, map, share } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DateHelper, Environment } from 'common/core/classes';
import { idGenerator } from 'common/core/lib';
import { SessionService } from 'common/core/services/session.service';


import {
  ApiError,
  ApiRequestBody,
  ApiRequestDefinition,
  ApiRequestOptions,
  ApiRequestQueueItem,
  ApiResponse,
} from '../structures';
import { ApiErrorHandler } from './api-errorhandler.service';


@Injectable()
export class ApiClientService {

  private lock: boolean;
  private readonly queue: Array<ApiRequestQueueItem>;
  private readonly tabSessionId: string;


  private static generatePerfActionId(body: any): string {
    const perfActionId = (
      (body && body.operation && body.operation === 'log_perf') ?
        idGenerator('log_performance|') :
        (body && body.operation && body.operation === 'log_errors') ? idGenerator('log_errors|') : undefined
    );

    return perfActionId;
  }


  constructor(
    private readonly http: HttpClient,
    private readonly apiErrorHandler: ApiErrorHandler,
    private readonly sessionService: SessionService,
    private readonly environment: Environment,
  ) {
    this.queue = [];
    this.lock = false;
    this.tabSessionId = this.sessionService.getTabSessionId();
  }


  call(key: string, body?: ApiRequestBody, options?: ApiRequestOptions): Observable<any> {
    const additionalOptions = _.assign(new ApiRequestOptions(), options);
    if (!additionalOptions.headers) {
      additionalOptions.headers = new HttpHeaders();
    }
    additionalOptions.headers = additionalOptions.headers.set('GTK-Operation', key);
    additionalOptions.headers = additionalOptions.headers.set('GTK-Tab-Id', this.tabSessionId);
    additionalOptions.headers = additionalOptions.headers.set('GTK-Timezone-Offset', DateHelper.getTimezoneUTC());
    additionalOptions.headers = additionalOptions.headers.set(
      'GTK-Timezone-Region',
      Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || '',
    );
    const requestConfig: ApiRequestDefinition = this.buildRequestConfig(key, body, additionalOptions);
    const queueItem = new ApiRequestQueueItem(requestConfig, additionalOptions.skipDefaultErrorHandler);
    this.triggerNextInQueue(queueItem);

    const request = new Observable<ApiResponse>((observer) => {
      queueItem.launchRequestWhenReady(observer);

      return () => {
        queueItem.destroy();
      };
    });

    return request.pipe(share());
  }


  private buildRequestConfig(key: string, body: ApiRequestBody, additionalOptions: ApiRequestOptions): ApiRequestDefinition {
    const version: ApiRequestBody = {version: this.environment.version};

    const request: ApiRequestDefinition = {
      method: additionalOptions.method,
      url: this.environment.apiBaseUrl + additionalOptions.path,
      sync: additionalOptions.sync,
    };

    request.body = (additionalOptions.sendVersion) ?
      _.assign({}, version, request.body, body) :
      _.assign({}, request.body, body);

    if (!request.body.operation) {
      request.body.operation = key;
    }

    request.params = _.assign(new HttpParams(), request.params, additionalOptions.params);
    request.headers = _.assign(new HttpHeaders(), request.headers, additionalOptions.headers);

    return request;
  }


  private triggerNextInQueue(item: ApiRequestQueueItem) {
    if (this.queue.length) {
      this.queue.push(item);
    } else { // queue is empty
      if (this.lock) { // if locked by another executing request, push this new one to the queue
        this.queue.push(item);
      } else { // if not locked, execute immediately
        this.executeRequest(item);
      }
    }
  }


  private executeRequest(item: ApiRequestQueueItem) {
    this.lock = item.request.sync;
    this.requestConsumed();

    const request = this.buildRequestByMethodType(item).pipe(
      finalize(() => {
        this.lock = false;
        this.requestConsumed();
      }),
    );

    item.registerRequest(request);
  }


  private requestConsumed() {
    if (!this.lock && this.queue.length) {
      this.executeRequest(this.queue.splice(0, 1)[0]); // execute next queued item
    }
  }


  private buildRequestByMethodType(item: ApiRequestQueueItem): Observable<any> {
    let observable$: Observable<any>;
    const requestUrl: string = (typeof item.request.url === 'function' ? item.request.url(item.request.body) : item.request.url);
    switch (item.request.method) {
      case 'GET':
        observable$ = this.get(requestUrl, item.request.params, item.request.headers, item.skipDefaultErrorHandler);
        break;
      case 'POST':
        observable$ = this.post(requestUrl, item.request.body, item.request.params, item.request.headers, item.skipDefaultErrorHandler);
        break;
      case 'PUT':
        observable$ = this.put(requestUrl, item.request.body, item.request.params, item.request.headers, item.skipDefaultErrorHandler);
        break;
      case 'DELETE':
        observable$ = this.delete(requestUrl, item.request.params, item.request.headers, item.skipDefaultErrorHandler);
        break;
      default:
        throw new Error('Wrong request format(' + item.request.method + ')');
    }

    return observable$;
  }


  private get(url: string, params?: HttpParams, headers?: HttpHeaders, skipDefaultErrorHandler?: boolean): Observable<any> {
    const perfKey = 'GET ' + url + (params && params.has('operation') ? ' - ' + params.get('operation') : '');

    const request = this.http.get<ApiResponse>(url, {params, headers})
      .pipe(
        map(this.handleResponse),
        catchError((err) => {
          return this.handleError(err, skipDefaultErrorHandler);
        }),
      );

    return request;
  }


  private put(url: string, body: any, params?: HttpParams, headers?: HttpHeaders, skipDefaultErrorHandler?: boolean): Observable<any> {
    const perfKey = 'PUT ' + url + (body && body.operation ? ' - ' + body.operation : '');

    const request = this.http.put<ApiResponse>(url, body, {params, headers})
      .pipe(
        map(this.handleResponse),
        catchError((err) => {
          return this.handleError(err, skipDefaultErrorHandler);
        }),
      );

    return request;
  }


  private post(url: string, body: any, params?: HttpParams, headers?: HttpHeaders, skipDefaultErrorHandler?: boolean): Observable<any> {
    const perfKey = 'POST ' + url + (body && body.operation ? ' - ' + body.operation : '');
    const perfActionId = ApiClientService.generatePerfActionId(body);

    let request;

    if (body && body.operation && body.operation === 'log_perf') {
      request = this.http.post<ApiResponse>(url, body, {params, headers})
        .pipe(
          map(this.handleResponse),
          catchError((err) => {
            return this.handleError(err, skipDefaultErrorHandler);
          }),
        );
    } else {
      request = this.http.post<ApiResponse>(url, body, {params, headers})
        .pipe(
          map(this.handleResponse),
          catchError((err) => {
            return this.handleError(err, skipDefaultErrorHandler);
          }),
        );
    }

    return request;
  }


  private delete(url: string, params?: HttpParams, headers?: HttpHeaders, skipDefaultErrorHandler?: boolean): Observable<any> {
    const perfKey = 'DELETE ' + url + (params && params.has('operation') ? ' - ' + params.get('operation') : '');

    const request = this.http.delete<ApiResponse>(url, {params, headers})
      .pipe(
        map(this.handleResponse),
        catchError((err) => {
          return this.handleError(err, skipDefaultErrorHandler);
        }),
      );

    return request;
  }


  private handleResponse(response: ApiResponse): any {
    if (response) {
      if (response.status === 'success') {
        return response.payload;
      } else {
        throw new ApiError(response.status, response.payload);
      }
    } else {
      return undefined;
    }
  }


  private handleError(err: any, skipDefaultErrorHandler?: boolean): Observable<any> {
    return this.apiErrorHandler.handleError(err, skipDefaultErrorHandler);
  }


  private checkSuccess(response: ApiResponse): any {
    return response && response.status === 'success';
  }

}
