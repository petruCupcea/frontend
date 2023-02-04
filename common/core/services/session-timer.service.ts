import { Injectable } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { ApiClientService } from 'common/request';

import { AuthService } from './auth.service';
import { REQUESTS_DEFINITION } from '../types';


declare const document: any;


@Injectable()
export class SessionTimerService {

  displayTime: number;
  countFromSessionTime: number;
  private fullSessionTime: number;
  private timer: Subscription;
  private readonly onUserEventAction: () => void;


  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly apiClientService: ApiClientService,
  ) {
    this.onUserEventAction = () => {
      if (this.displayTime < this.countFromSessionTime) {
        this.initTimer();
      }
    };
  }


  init(): Observable<{fullSession: number; countFrom: number}> {
    const request = this.getSessionConfig();
    request.subscribe(() => {
      this.initTimer();
      this.initUserActionsEvents();
    });

    return request;
  }


  destroy() {
    this.destroyUserActionsEvents();
  }


  private getSessionConfig(): Observable<{fullSession: number; countFrom: number}> {
    const request = this.apiClientService.call(REQUESTS_DEFINITION.KEY_SESSION_TIME_CONFIG);
    request.subscribe((data: {fullSession: number; countFrom: number}) => {
      this.fullSessionTime = data.fullSession;
      this.countFromSessionTime = data.countFrom;
    }, () => {
      this.logout();
    });

    return request;
  }


  private initTimer() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
    this.displayTime = this.fullSessionTime;
    this.timer = interval(1000)
      .pipe(
        take(this.displayTime),
      ).subscribe(() => {
        this.displayTime--;

        if (this.displayTime === 0) {
          this.logout();
        }
      });
  }


  private initUserActionsEvents() {
    document.addEventListener('click', this.onUserEventAction);
    document.addEventListener('keypress', this.onUserEventAction);
  }


  private destroyUserActionsEvents() {
    document.removeEventListener('click', this.onUserEventAction);
    document.removeEventListener('keypress', this.onUserEventAction);
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }


  private logout() {
    this.destroy();
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
