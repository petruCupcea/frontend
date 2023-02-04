import { Injector } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { Router } from '@angular/router';

import {
  ApiError,
  ApiErrorHandler,
  API_ERROR_TYPE_ALERT_POPUP,
  API_ERROR_TYPE_NOSESSION,
  API_ERROR_TYPE_SYSTEM_ERROR,
} from 'common/request';
import { AuthService, detach } from 'common/core';
import { SystemService } from 'common/system';


export class ApiCustomErrorHandler extends ApiErrorHandler {

  constructor(
    private readonly system: SystemService,
    private readonly injector: Injector,
  ) {
    super();
    this.registerNoSkipErrorHandler(this.checkTypeNoSessionError());

    this.registerErrorHandler(this.checkTypeAlertError());
    this.registerErrorHandler(this.checkTypeSystemError());
    this.registerErrorHandler(this.defaultError());
  }


  get router(): Router {
    return this.injector.get(Router);
  }


  get authService(): AuthService {
    return this.injector.get(AuthService);
  }


  private checkTypeAlertError(): (apiError: ApiError) => Observable<ApiError> {
    return (apiError: ApiError) => {
      if (apiError && apiError.type && apiError.type === API_ERROR_TYPE_ALERT_POPUP) {
        detach(() => {
          this.system.alert(apiError.error);
        });

        return observableThrowError(apiError);
      }

      return undefined;
    };
  }


  private checkTypeSystemError(): (apiError: ApiError) => Observable<ApiError> {
    return (apiError: ApiError) => {
      if (apiError && apiError.type && apiError.type === API_ERROR_TYPE_SYSTEM_ERROR) {
        detach(() => {
          this.system.alert(apiError.error);
        });

        return observableThrowError(apiError);
      }

      return undefined;
    };
  }


  private checkTypeNoSessionError(): (apiError: ApiError) => Observable<ApiError> {
    return (apiError: ApiError) => {
      if (apiError && apiError.type && apiError.type === API_ERROR_TYPE_NOSESSION) {
        this.authService.invalidateSession();
        detach(() => {
          this.router.navigate(['/login']);
          this.system.alert(apiError.error);
        });

        return observableThrowError(apiError);
      }

      return undefined;
    };
  }


  private defaultError(): (apiError: ApiError) => Observable<ApiError> {
    return (apiError: ApiError) => {
      if (this.isDefaultErrorCondition(apiError)) {
        detach(() => {
          this.system.alert({message: '[SYSTEM ERROR]'});
        });

        return observableThrowError(apiError);
      }

      return undefined;
    };
  }


  private isDefaultErrorCondition(apiError: ApiError): boolean {
    if (apiError && apiError.type) {
      const notAlertPopupError = (apiError.type !== API_ERROR_TYPE_ALERT_POPUP);
      const notNoSessionError = (apiError.type !== API_ERROR_TYPE_NOSESSION);
      const notSystemError = (apiError.type !== API_ERROR_TYPE_SYSTEM_ERROR);

      return (notAlertPopupError && notNoSessionError && notSystemError);
    }

    return false;
  }

}
