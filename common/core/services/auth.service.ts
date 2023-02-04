import { BehaviorSubject, Observable, of as observableOf, Observer, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ApiClientService } from 'common/request';

import { Environment } from '../classes';
import { ExpiredPasswordService } from './expired-password.service';
import { REQUESTS_DEFINITION } from '../types';
import { SessionService } from './session.service';


@Injectable()
export class AuthService {

  allowedRoutes: Array<string>;
  fallbackRoute: string;
  authenticateEmitter: BehaviorSubject<string>;
  private _isAuthenticated: boolean;
  private _userRole: number;
  private readonly _onLogin: Subject<any>;
  private readonly _onLogout: Subject<any>;
  private readonly allowedRoutesSubject: Subject<Array<string>>;


  constructor(
    private readonly apiClientService: ApiClientService,
    private readonly sessionService: SessionService,
    private readonly environment: Environment,
    private readonly expiredPasswordService: ExpiredPasswordService,
  ) {
    this._onLogin = new Subject<any>();
    this._onLogout = new Subject<any>();
    this.allowedRoutesSubject = new Subject<Array<string>>();
    this.authenticateEmitter = new BehaviorSubject('');
  }


  get userRole(): number {
    return this._userRole;
  }


  set userRole(value: number) {
    this._userRole = value;
  }


  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }


  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }


  get onLogin(): Observable<any> {
    return this._onLogin.asObservable();
  }


  get onLogout(): Observable<any> {
    return this._onLogout.asObservable();
  }


  get onRoutePermissionsChanged(): Observable<Array<string>> {
    return this.allowedRoutesSubject.asObservable();
  }


  login(username: string, password: string, clientCode?: string): Observable<any> {
    return this.apiClientService.call(REQUESTS_DEFINITION.KEY_LOGIN_BY_CREDENTIALS, {
      payload: {
        username: username,
        password: password,
        clientCode: clientCode,
      },
    }, {
      sync: true,
    }).pipe(
      map((response: any) => {
        this.mapResponseFields(response);
        this.sessionService.sid = response.sid;
        this._onLogin.next(undefined);

        return response;
      }),
    );
  }


  loginBySid(): Observable<any> {
    const request = this.apiClientService.call(REQUESTS_DEFINITION.KEY_LOGIN_BY_SID, undefined, {
      sync: true,
    }).pipe(
      map((response: any) => {
        this.mapResponseFields(response);
        this.sessionService.sid = response.sid;
        this.authenticateEmitter.next('sid');
        this._onLogin.next(undefined);

        return response;
      }),
    );

    return request;
  }


  logout(): Observable<any> {
    return this.apiClientService.call(REQUESTS_DEFINITION.KEY_LOGOUT, undefined, {
      sync: true,
    }).pipe(
      map((response: any) => {
        this.mapResponseFields(response);
        this.sessionService.sid = undefined;
        this._isAuthenticated = false;
        this._onLogout.next(undefined);

        return response;
      }),
    );
  }


  hasRoutePermission(routeKey: string): Observable<boolean> {
    if (this.allowedRoutes) {
      return observableOf(!routeKey || this.allowedRoutes.indexOf(routeKey) >= 0);
    } else {
      // if allowedRoutes is empty - app is (re)starting - need to loginBySid() first.
      return new Observable((observer: Observer<boolean>) => {
        // FIXME: this triggers new `login_by_sid` request every time is called.
        this.loginBySid().subscribe(() => {
          observer.next(!routeKey || this.allowedRoutes.indexOf(routeKey) >= 0);
          observer.complete();
          this.expiredPasswordService.setRoutesList(this.allowedRoutes);
        }, () => {
          observer.next(false);
          observer.complete();
        });
      });
    }
  }


  invalidateSession() {
    this._onLogout.next(undefined);
    this._isAuthenticated = false;
    this.registerNewRoutes(['login']);
    this.fallbackRoute = 'login';
  }


  getLastSessionTime(): Observable<any> {
    return this.apiClientService.call(REQUESTS_DEFINITION.KEY_GET_LAST_SESSION_TIME);
  }


  private mapResponseFields(response: any) {
    this._userRole = response.role;
    this.registerNewRoutes(response.routes);
    if (this.environment.defaultRoutes) {
      this.registerNewRoutes(this.allowedRoutes.concat(this.environment.defaultRoutes));
    }
    this.fallbackRoute = response.fallback;
  }


  private registerNewRoutes(routes: Array<string>) {
    this.allowedRoutes = routes;
    this.allowedRoutesSubject.next(routes);
  }

}
