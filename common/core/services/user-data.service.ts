import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiClientService } from 'common/request';

import { AuthService } from './auth.service';
import { DataSync } from '../classes';
import { REQUESTS_DEFINITION } from '../types';


@Injectable()
export class UserDataService {

  private _data: DataSync<any>;


  constructor(
    private readonly apiClientService: ApiClientService,
    private readonly authService: AuthService,
  ) {
    this._data = new DataSync<any>(this.apiClientService);
    this.authService.onLogout.subscribe(() => {
      this.destroy();
    });
  }


  set data(value: any) {
    this._data.setData(value);
  }


  get data() {
    return this._data.getData();
  }


  setUserData(userData) {
    const request = this.apiClientService.call(REQUESTS_DEFINITION.KEY_SET_USER_DATA, {
      payload: userData,
    });
    request.subscribe(() => {
      this.refreshUserData();
    });

    return request;
  }


  getUserData(forceRequest?: boolean): Observable<any> {
    return this._data.requestData(REQUESTS_DEFINITION.KEY_GET_USER_DATA, 'userData', forceRequest);
  }


  refreshUserData(): Observable<any> {
    return this.getUserData(true);
  }


  private destroy() {
    this._data = new DataSync<any>(this.apiClientService);
  }

}
