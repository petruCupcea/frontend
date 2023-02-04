import { Injectable } from '@angular/core';

import { idGenerator } from '../lib';


@Injectable()
export class SessionService {

  sid: string;
  private readonly tabSessionId: string;


  constructor() {
    this.sid = undefined;
    this.tabSessionId = idGenerator();
  }


  getTabSessionId(): string {
    return this.tabSessionId;
  }

}
