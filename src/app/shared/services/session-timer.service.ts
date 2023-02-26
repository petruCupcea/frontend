import { DOCUMENT } from '@angular/common';
import { fromEvent, merge, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';

import { AuthExpireTriggerService } from './auth-expire-trigger.service';


@Injectable()
export class SessionTimerService {

  private timerSubscription: Subscription;
  private readonly stopTimer: Subject<boolean>;
  private readonly userInteractions: Observable<any>;


  constructor(
    @Inject(DOCUMENT) document: Document,
    private readonly authExpireTriggerService: AuthExpireTriggerService,
  ) {
    this.stopTimer = new Subject();
    this.userInteractions = fromEvent(document, 'click');
  }


  start(delay: number) {
    const time = (delay * 60 * 1000);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = merge(of(undefined), this.userInteractions)
      .pipe(
        switchMap(() => timer(time)),
        takeUntil(this.stopTimer),
      )
      .subscribe(() => {
        this.authExpireTriggerService.expire();
      });
  }


  stop() {
    this.stopTimer.next(true);
  }

}
