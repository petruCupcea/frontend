import { Directive, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Directive()
export class DestroyPattern implements OnDestroy {

  private readonly _onDestroy: Subject<any>;


  constructor() {
    this._onDestroy = new Subject<any>();
  }


  get onDestroy(): Observable<any> {
    return this._onDestroy.asObservable();
  }


  ngOnDestroy() {
    this._onDestroy.next(undefined);
  }

}
