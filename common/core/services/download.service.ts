import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { ApiClientService } from 'common/request';

import { Environment } from '../classes';


declare const $: any;


@Injectable()
export class DownloadService {

  private downloadStatusTimeout: any;
  private downloadTimeout: any;
  private startDownloadTimestamp: number;
  private requestStatusSubscription: Subscription;


  constructor(
    private readonly apiClientService: ApiClientService,
    private readonly environment: Environment,
  ) {
  }


  download(
    startRequestKey: string,
    requestKey: string,
    startPayload: any,
    startResponseHandler: (response: any) => any,
    statusResponseHandler: (response: any) => string,
  ): Observable<string> {
    const downloadSubject = new Subject<string>();

    // Makes the initial request to start the download process
    // Once that completes, set the timeout and polling interval for the download status
    this.requestDownloadStart(
      startRequestKey,
      requestKey,
      startPayload,
      startResponseHandler,
      statusResponseHandler,
      this.environment.downloadPollingIntervalInMs,
      this.environment.downloadTimeoutInMs,
      downloadSubject,
    );

    return downloadSubject.asObservable();
  }


  directDownload(payloadUrl: string) {
    const iframe = $('#file-download-iframe');
    if (iframe && iframe.length) {
      iframe.remove();
    }

    const downloadUrl = (this.environment.apiBaseUrl + payloadUrl);
    this.downloadContent(downloadUrl);
  }


  private startStatusTimeout(
    requestKey: string,
    statusPayload: any,
    statusResponseHandler: (response: any) => string,
    downloadSubject: Subject<string>,
    pollingInterval: number,
  ) {
    const currentDownloadTimestamp = new Date().getTime();
    const difference = (currentDownloadTimestamp - this.startDownloadTimestamp);

    if (pollingInterval <= difference) {
      this.requestDownloadStatus(requestKey, statusPayload, statusResponseHandler, downloadSubject, pollingInterval);

      return;
    }

    const remainingMs = (pollingInterval - difference);
    this.downloadStatusTimeout = setTimeout(() => {
      this.requestDownloadStatus(requestKey, statusPayload, statusResponseHandler, downloadSubject, pollingInterval);
    }, remainingMs);
  }


  private requestDownloadStart(
    startRequestKey: string,
    requestKey: string,
    startPayload: any,
    startResponseHandler: (response: any) => any,
    statusResponseHandler: (response: any) => string,
    pollingInterval: number,
    timeoutInMs: number,
    downloadSubject: Subject<string>,
  ) {
    this.apiClientService.call(startRequestKey, {payload: startPayload}).subscribe((response: any) => {
      let statusPayload = startResponseHandler(response);

      // Starts the polling mechanism for the download status
      this.requestDownloadStatus(requestKey, statusPayload, statusResponseHandler, downloadSubject, pollingInterval);

      // Sets a timeout to cancel the ongoing polling mechanism in case nothing happens
      // for more than X seconds
      this.downloadTimeout = setTimeout(() => {
        if (statusPayload && !statusPayload.$completed) {
          statusPayload = undefined;
          downloadSubject.error('Timeout! Please try again...');
          this.clearDownload();
        }
      }, timeoutInMs);
    }, (error: any) => {
      downloadSubject.error(error.error);
      this.clearDownload();
    });
  }


  private requestDownloadStatus(
    requestKey: string,
    statusPayload: any,
    statusResponseHandler: (response: any) => string,
    downloadSubject: Subject<string>,
    pollingInterval: number,
  ) {
    if (statusPayload && statusPayload.$completed) {
      this.clearDownload();

      return;
    }

    this.startDownloadTimestamp = new Date().getTime();
    this.requestStatusSubscription = this.apiClientService.call(requestKey, {payload: statusPayload})
      .subscribe((response: any) => {
        const payloadUrl = statusResponseHandler(response);
        const downloadUrl = this.environment.apiBaseUrl + payloadUrl;
        if (!payloadUrl) {
          this.startStatusTimeout(requestKey, statusPayload, statusResponseHandler, downloadSubject, pollingInterval);

          return;
        }

        const iframe = $('#file-download-iframe');
        if (iframe && iframe.length) {
          iframe.remove();
        }

        this.downloadContent(downloadUrl);
        statusPayload.$completed = true; // helper property

        downloadSubject.next(undefined);
        downloadSubject.complete();
      }, (error: any) => {
        statusPayload = undefined;
        downloadSubject.error(error.error);
        this.clearDownload();
      });
  }


  private downloadContent(url) {
    const frame = $('<iframe id="file-download-iframe" width="0" height="0" style="visibility:hidden;"></iframe>');
    frame.appendTo('body');
    frame.attr('src', url);
  }


  private clearDownload() {
    if (this.requestStatusSubscription) {
      this.requestStatusSubscription.unsubscribe();
    }

    if (this.downloadStatusTimeout) {
      clearTimeout(this.downloadStatusTimeout);
    }

    clearTimeout(this.downloadTimeout);
  }

}
