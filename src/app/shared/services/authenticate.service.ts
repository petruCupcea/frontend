import { Injectable } from '@angular/core';
import { SessionControlService } from './session-control.service';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiRequestService } from '../../api-module';

import { BaseComponent } from '../classes';


@Injectable()
export class AuthenticateService extends BaseComponent {

  loggedIn: BehaviorSubject<boolean>;
  userId: number;

  constructor(
    private readonly apiRequestService: ApiRequestService,
    private readonly sessionControlService: SessionControlService,
  ) {
    super();
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }


  login(credentials: {email: string; password: string}): Observable<any> {
    return this.apiRequestService.callOperation('login_user', credentials);
  }


  setLoggedIn(value): void {
    this.loggedIn.next(value);
  }


  getLoggedInValue(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

}
