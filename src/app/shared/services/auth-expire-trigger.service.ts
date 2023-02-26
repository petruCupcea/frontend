import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthExpireTriggerService {

  private readonly _expire: EventEmitter<any>;


  constructor() {
    this._expire = new EventEmitter();
  }


  get onExpire(): Observable<any> {
    return this._expire.asObservable();
  }


  expire() {
    this._expire.emit();
  }

}
