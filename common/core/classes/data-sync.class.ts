import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ApiClientService } from 'common/request';

import {
  DataSyncStatusType,
  DATA_SYNC_EMPTY,
  DATA_SYNC_IN_PROGRESS,
  DATA_SYNC_READY,
} from '../types';
import { detach } from '../lib';


export class DataSync<T> {

  private _status: BehaviorSubject<DataSyncStatusType>;
  private _data: T;


  constructor(private readonly apiClientService: ApiClientService) {
    this.setStatusEmpty();
  }


  get status(): BehaviorSubject<DataSyncStatusType> {
    return this._status;
  }


  setData(value: T) {
    if (!value) {
      this.setStatusEmpty();

      return;
    }
    this._data = value;
  }


  getData(): T {
    return this._data;
  }


  requestData(requestName: string, dataPropertyPath?: string, forceRequest?: boolean): Observable<T> {
    const localSubject = new Subject<T>();

    if (this.isStatusEmpty() || forceRequest) {
      this.setStatusInProgress();
      this.apiClientService.call(requestName).subscribe((response: any) => {
        const finalResponse = dataPropertyPath ? response[dataPropertyPath] : response;
        this.setData(finalResponse);
        this.setStatusReady();
        this.emitDataAfterOuterSubscription(localSubject);
      }, () => {
        this.setStatusEmpty();
        this.emitDataAfterOuterSubscription(localSubject);
      });
    } else if (this.isStatusReady()) {
      this.emitDataAfterOuterSubscription(localSubject);
    } else if (this.isStatusInProgress()) {
      this.status.subscribe(() => {
        if (this.isStatusReady() || this.isStatusEmpty()) {
          this.emitDataAfterOuterSubscription(localSubject);
        }
      });
    }

    return localSubject.asObservable();
  }


  private emitDataAfterOuterSubscription(subject: Subject<T>) {
    detach(() => {
      subject.next(this.getData());
    });
  }


  private setStatusEmpty() {
    if (!this._status) {
      this._status = new BehaviorSubject<DataSyncStatusType>(DATA_SYNC_EMPTY);
    }
    this._status.next(DATA_SYNC_EMPTY);
    this._data = undefined;
  }


  private isStatusEmpty(): boolean {
    return (this._status.value === DATA_SYNC_EMPTY);
  }


  private setStatusReady() {
    this._status.next(DATA_SYNC_READY);
  }


  private isStatusReady(): boolean {
    return (this._status.value === DATA_SYNC_READY);
  }


  private setStatusInProgress() {
    this._status.next(DATA_SYNC_IN_PROGRESS);
  }


  private isStatusInProgress(): boolean {
    return (this._status.value === DATA_SYNC_IN_PROGRESS);
  }

}
