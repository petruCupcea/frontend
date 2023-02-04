import { Observable } from 'rxjs';

import { ModalParamsModel, MODAL_PARAMS } from 'common/modal';

import { LoadingOptions } from './loading-options.interface';
import { SystemType, SYSTEM_ALERT } from '../types';


export class Loading {

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


  title: string;
  message: string;
  blocking: Observable<any>;


  constructor(options: LoadingOptions) {
    this.title = options.title || '';
    this.message = options.message || '';
    this.blocking = options.blocking;
  }

}
