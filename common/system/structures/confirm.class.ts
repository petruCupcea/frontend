import { Observable } from 'rxjs';

import { ModalParamsModel, MODAL_PARAMS } from 'common/modal';

import { ConfirmOptions } from './confirm-options.interface';
import { SystemSizeType, SystemThemeType, SystemType, SYSTEM_CONFIRM } from '../types';


export class Confirm {

  static type: SystemType = SYSTEM_CONFIRM;
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
  private readonly _refuseLabel: string;
  private readonly _closable: boolean;
  private readonly _loading: boolean;
  private readonly _callback: (confirm: boolean) => Observable<any> | undefined | void;


  constructor(confirm: ConfirmOptions, callback: (confirmParam: boolean) => Observable<any> | undefined | void) {
    this._title = confirm.title;
    this._message = confirm.message;
    this._size = confirm.size;
    this._theme = confirm.theme;
    this._acceptLabel = confirm.acceptLabel;
    this._refuseLabel = confirm.refuseLabel;
    this._closable = confirm.closable;
    this._loading = confirm.loading;
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


  get refuseLabel() {
    return this._refuseLabel;
  }


  get closable() {
    return this._closable;
  }


  get loading() {
    return this._loading;
  }


  get callback(): (confirm: boolean) => Observable<any> | undefined | void {
    return this._callback;
  }

}
