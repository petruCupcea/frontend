import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';

import { ApiError } from '../structures';
import {
  ApiErrorType,
  API_ERROR_TYPE_ERROR,
  API_ERROR_TYPE_UNAUTHENTICATED,
  API_ERROR_TYPE_UNAUTHORIZED,
} from '../types';


@Injectable()
export class ApiErrorHandler {

  private readonly noSkipErrorHandlers: Array<(err: any) => Observable<ApiError>>;
  private readonly errorHandlers: Array<(err: any) => Observable<ApiError>>;


  constructor() {
    this.noSkipErrorHandlers = [];
    this.errorHandlers = [];
    this.registerErrorHandler(this.clientAccessError());
  }


  handleError(err: any, skipDefaultErrorHandler?: boolean): Observable<ApiError> {
    for (const handler of this.noSkipErrorHandlers) {
      const handledError = handler(err);
      if (handledError) {
        return handledError;
      }
    }

    if (!skipDefaultErrorHandler) {
      for (const handler of this.errorHandlers) {
        const handledError = handler(err);
        if (handledError) {
          return handledError;
        }
      }
    }

    return observableThrowError(err);
  }


  registerNoSkipErrorHandler(handler: (err: any) => Observable<ApiError>) {
    this.noSkipErrorHandlers.push(handler);
  }


  registerErrorHandler(handler: (err: any) => Observable<ApiError>) {
    this.errorHandlers.push(handler);
  }


  private clientAccessError(): (err: any) => Observable<ApiError> {
    return (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.error && err.status) {
          // A client-side or network error occurred.
          let errorType: ApiErrorType;
          switch (err.status) {
          case 401:
            errorType = API_ERROR_TYPE_UNAUTHENTICATED;
            break;
          case 403:
            errorType = API_ERROR_TYPE_UNAUTHORIZED;
            break;
          default:
            errorType = API_ERROR_TYPE_ERROR;
          }

          return observableThrowError(new ApiError(errorType, err.error));
        } else if (!err.status) {
          // A network error occurred.
          return observableThrowError(new ApiError(API_ERROR_TYPE_ERROR, {message: 'Failed to reach the server'}));
        }

        return observableThrowError(new ApiError(API_ERROR_TYPE_ERROR, {message: `${err.status} - ${err.statusText}`}));
      }

      return undefined;
    };
  }

}
