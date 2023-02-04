import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiClientService } from 'common/request';

import { AuthService } from './auth.service';
import { detach } from '../lib';
import { REQUESTS_DEFINITION } from '../types';
import { UserDataService } from './user-data.service';


@Injectable()
export class UserAccountsService {

  private _currentUser: any;
  private _userList: Array<any>;


  constructor(
    private readonly router: Router,
    private readonly apiClientService: ApiClientService,
    private readonly authService: AuthService,
    private readonly userDataService: UserDataService,
  ) {
    this.authService.onLogout.subscribe(() => {
      this.destroy();
    });
  }


  get currentUser() {
    return this._currentUser;
  }


  get userList() {
    return this._userList;
  }


  switchAccount(account) {
    const request = this.apiClientService.call(REQUESTS_DEFINITION.KEY_CHANGE_USER_ACCOUNT, {
      payload: account,
    });
    request.subscribe(() => {
      this.router.navigate(['/']);
      detach(() => {
        location.reload();
      });
    });

    return request;
  }


  resetUserData() {
    this.userDataService.data = undefined;
    this._currentUser = undefined;
    this._userList = undefined;
  }


  loadUserAccounts(showModal?: boolean, callback?: () => void) {
    const request = this.apiClientService.call(REQUESTS_DEFINITION.KEY_USER_ACCOUNTS, {
      payload: {},
    });
    request.subscribe((response: any) => {
      this._currentUser = this.getCurrentUser(response.userList);
      this._userList = response.userList;

      this.userDataService.refreshUserData();

      if (this.userList.length <= 1 || this.currentUser.isUserDefault) {
        this.authService.isAuthenticated = true;

        return;
      }

      if (showModal) {
        callback();
      } else {
        this.authService.isAuthenticated = true;
      }
    });

    return request;
  }


  private getCurrentUser(list: Array<any>) {
    let result;
    _.each(list, (value) => {
      if (!value.isCurrent) {
        return;
      }
      result = value;
    });

    return result;
  }


  private destroy() {
    this.resetUserData();
  }

}
