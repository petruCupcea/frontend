import * as _ from 'lodash';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalWrapper } from 'common/modal';

import { Confirm, ConfirmOptions } from '../structures';


@Injectable()
export class ConfirmService {

  onConfirmAddToStack: EventEmitter<any>;
  currentModal: ModalWrapper;
  private readonly _stack: Array<Confirm>;
  private readonly confirmDefaults: ConfirmOptions;


  constructor() {
    this.onConfirmAddToStack = new EventEmitter();
    this._stack = [];
    this.confirmDefaults = {
      title: 'GLOBAL.DEFAULT_CONFIRM_TITLE',
      message: undefined,
      theme: 'danger',
      size: 'small',
      acceptLabel: 'GLOBAL.OK_BTN',
      refuseLabel: 'GLOBAL.CANCEL_BTN',
      closable: true,
      loading: false,
    };
  }


  current(): Confirm {
    return this._stack[0];
  }


  add(options: ConfirmOptions, callback: (confirmParam: boolean) => Observable<any> | undefined | void): ModalWrapper {
    const confirmOptions = _.merge({}, this.confirmDefaults, options);
    const confirm = new Confirm(confirmOptions, callback);

    this._stack.push(confirm);
    this.onConfirmAddToStack.emit();

    return this.currentModal;
  }


  clear() {
    this._stack.shift();
  }

}
