import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { SessionTimerService } from './session-timer.service';


@Injectable()
export class SessionControlService {

  private sessionId: string;
  private readonly _sessionWillEnd: Subject<boolean>;


  constructor(private readonly sessionTimerService: SessionTimerService) {
    this._sessionWillEnd = new Subject<boolean>();
  }


  get sid(): string {
    return this.sessionId;
  }


  get sessionWillEnd(): Observable<boolean> {
    return this._sessionWillEnd.asObservable();
  }


  init(options: {sid: string; sessionInterval: number}) {
    this.sessionId = options.sid;
    const resultInterval = (options.sessionInterval ? options.sessionInterval : (30 * 60 * 1000));
    this.sessionTimerService.start(resultInterval);
  }


  destroy() {
    this._sessionWillEnd.next(true);
    this.sessionId = undefined;
    this.sessionTimerService.stop();
  }

}
