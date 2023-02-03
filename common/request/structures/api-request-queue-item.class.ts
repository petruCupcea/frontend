import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiRequestDefinition } from './api-request-definition.class';
import { ApiResponse } from './api-response.class';


export class ApiRequestQueueItem {

  private readonly registeredCallback: BehaviorSubject<Observable<ApiResponse>>;
  private readonly onDestroy: Subject<any>;


  constructor(
    public request: ApiRequestDefinition,
    public skipDefaultErrorHandler: boolean,
  ) {
    this.registeredCallback = new BehaviorSubject<Observable<ApiResponse>>(undefined);
    this.onDestroy = new Subject<any>();
  }


  registerRequest(request: Observable<ApiResponse>) {
    this.registeredCallback.next(request);
  }


  launchRequestWhenReady(observer: any) {
    this.registeredCallback.pipe(takeUntil(this.onDestroy)).subscribe((request: Observable<ApiResponse>) => {
      if (request) {
        request.pipe(takeUntil(this.onDestroy)).subscribe(observer);
      }
    });
  }


  destroy() {
    this.onDestroy.next(undefined);
  }

}
