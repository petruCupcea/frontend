import * as _ from 'lodash';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalWrapper } from 'common/modal';

import { Prompt, PromptOptions } from '../structures';


@Injectable()
export class PromptService {

  onPromptAddToStack: EventEmitter<any>;
  currentPrompt: ModalWrapper;
  private readonly _stack: Array<Prompt>;
  private readonly promptDefaults: PromptOptions;


  constructor() {
    this.onPromptAddToStack = new EventEmitter();
    this._stack = [];

    this.promptDefaults = {
      promptType: 'text',
      promptOptions: undefined,
      validators: [],
      title: '',
      defaultValue: '',
      message: undefined,
      messageAfter: undefined,
      theme: 'info',
      size: 'small',
      acceptLabel: 'GLOBAL.OK_BTN',
      refuseLabel: 'GLOBAL.CANCEL_BTN',
      closable: true,
      loading: false,
    };
  }


  current(): Prompt {
    return this._stack[0];
  }


  add(options: PromptOptions, callback: (answer: string) => Observable<any> | undefined | void): ModalWrapper {
    const promptOptions = _.merge({}, this.promptDefaults, options);
    const prompt = new Prompt(promptOptions, callback);

    this._stack.push(prompt);
    this.onPromptAddToStack.emit();

    return this.currentPrompt;
  }


  clear() {
    this._stack.shift();
  }

}
