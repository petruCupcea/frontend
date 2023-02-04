import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { CountdownTimer } from '../classes';


@Injectable()
export class CountdownTimerService {

  loadEmitter: Observable<Array<string>>;
  private readonly _loadEmitter: BehaviorSubject<Array<string>>;
  private readonly _collection: Array<CountdownTimer>;
  private readonly _timerLoaded: Array<string>;


  constructor() {
    this._collection = [];
    this._timerLoaded = [];
    this._loadEmitter = new BehaviorSubject<Array<string>>(this._timerLoaded);
    this.loadEmitter = this._loadEmitter.asObservable();
  }


  get collection(): Array<any> {
    return this._collection;
  }


  addTimer(id: string, seconds: string) {
    const timer = new CountdownTimer(id, seconds);
    this._collection.push(timer);
    this._timerLoaded.push(id);
    this._loadEmitter.next(this._timerLoaded);
  }


  getTimer(timerId: string): CountdownTimer {
    return _.find(this._collection, (expected: any) => {
      return expected.id === timerId;
    });
  }


  delete(timerId: string) {
    _.remove(this._timerLoaded, (expected: any) => {
      return expected === timerId;
    });

    _.remove(this._collection, (expected: any) => {
      return expected.id === timerId;
    });
  }

}
