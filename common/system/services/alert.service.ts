import * as _ from 'lodash';
import { EventEmitter, Injectable } from '@angular/core';

import { ModalWrapper } from 'common/modal';

import { Alert, AlertOptions } from '../structures';


@Injectable()
export class AlertService {

  onAlertAddToStack: EventEmitter<Alert>;
  currentAlert: ModalWrapper;
  private _stack: Array<Alert>;
  private readonly alertDefaults: AlertOptions;


  constructor() {
    this.onAlertAddToStack = new EventEmitter();
    this._stack = [];
    this.alertDefaults = {
      title: 'GLOBAL.DEFAULT_ALERT_TITLE',
      closable: false,
      message: undefined,
      theme: undefined,
      size: 'small',
      acceptLabel: 'GLOBAL.OK_BTN',
    };
  }


  get stack() {
    return this._stack;
  }


  current(): Alert {
    return _.last(this._stack);
  }


  add(options: AlertOptions, callback?: () => void): ModalWrapper {
    const alertOptions = _.merge({}, this.alertDefaults, options);
    const alert = new Alert(alertOptions, callback);

    this._stack.push(alert);
    this.onAlertAddToStack.emit(alert);

    return this.currentAlert;
  }


  clear() {
    this._stack = [];
  }

}
