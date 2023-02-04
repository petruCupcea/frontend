import * as _ from 'lodash';
import { EventEmitter, Injectable } from '@angular/core';

import { ModalWrapper } from 'common/modal';

import { Loading, LoadingOptions } from '../structures';


@Injectable()
export class LoadingService {

  onLoadingAddToStack: EventEmitter<Loading>;
  currentLoading: ModalWrapper;
  private _stack: Array<Loading>;


  constructor() {
    this.onLoadingAddToStack = new EventEmitter();
    this._stack = [];
  }


  get stack() {
    return this._stack;
  }


  current(): Loading {
    return _.last(this._stack);
  }


  add(options: LoadingOptions): ModalWrapper {
    const modal = new Loading(options);
    this._stack.push(modal);
    this.onLoadingAddToStack.emit(modal);

    return this.currentLoading;
  }


  clear() {
    this._stack = [];
  }

}
