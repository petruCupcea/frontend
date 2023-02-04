import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalWrapper } from 'common/modal';

import { AlertOptions, ConfirmOptions, LoadingOptions, PromptOptions } from '../structures';
import { AlertService } from './alert.service';
import { ConfirmService } from './confirm.service';
import { LoadingService } from './loading.service';
import { PromptService } from './prompt.service';


@Injectable()
export class SystemService {

  constructor(
    private readonly alertService: AlertService,
    private readonly confirmService: ConfirmService,
    private readonly promptService: PromptService,
    private readonly loadingService: LoadingService,
  ) {
  }


  alert(options: AlertOptions, callback?: () => void): ModalWrapper {
    if (!options.message) {
      return undefined;
    }

    return this.alertService.add(options, callback);
  }


  confirm(options: ConfirmOptions, callback: (confirm: boolean) => Observable<any> | undefined | void): ModalWrapper {
    if (!options.message) {
      return undefined;
    }

    return this.confirmService.add(options, callback);
  }


  prompt(options: PromptOptions, callback: (answer: string) => Observable<any> | undefined | void): ModalWrapper {
    return this.promptService.add(options, callback);
  }


  loading(options: LoadingOptions): ModalWrapper {
    return this.loadingService.add(options);
  }

}
