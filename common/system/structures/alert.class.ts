import { ModalParamsModel, MODAL_PARAMS } from 'common/modal';

import { AlertOptions } from './alert-options.interface';
import { SystemSizeType, SystemThemeType, SystemType, SYSTEM_ALERT } from '../types';


export class Alert {

  static type: SystemType = SYSTEM_ALERT;
  static modalParams: ModalParamsModel = {
    ...MODAL_PARAMS,
    allowMultiple: true,
    selector: {
      close: '.close',
      approve: '.actions .modal-ok',
      deny: '.actions .modal-close',
    },
  };

  private readonly _title: string;
  private readonly _message: string;
  private readonly _size: SystemSizeType;
  private readonly _theme: SystemThemeType;
  private readonly _acceptLabel: string;
  private readonly _closable: boolean;
  private readonly _callback: () => void;


  constructor(alert: AlertOptions, callback: () => void) {
    this._title = alert.title;
    this._message = alert.message;
    this._size = alert.size;
    this._theme = alert.theme;
    this._acceptLabel = alert.acceptLabel;
    this._closable = alert.closable;
    this._callback = callback;
  }


  get title() {
    return this._title;
  }


  get message() {
    return this._message;
  }


  get size() {
    return this._size;
  }


  get theme() {
    return this._theme;
  }


  get acceptLabel() {
    return this._acceptLabel;
  }


  get closable() {
    return this._closable;
  }


  get callback() {
    return this._callback;
  }

}
