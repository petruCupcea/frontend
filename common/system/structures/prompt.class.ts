import { Observable } from 'rxjs';
import { ValidatorFn } from '@angular/forms';

import { ModalParamsModel, MODAL_PARAMS } from 'common/modal';

import { PromptOptions } from './prompt-options.interface';
import { PromptType, SystemSizeType, SystemThemeType, SystemType, SYSTEM_PROMPT } from '../types';


export class Prompt {

  static type: SystemType = SYSTEM_PROMPT;
  static modalParams: ModalParamsModel = {
    ...MODAL_PARAMS,
    allowMultiple: true,
    selector: {
      close: '.close',
      approve: '.actions .modal-ok',
      deny: '.actions .modal-close',
    },
  };

  private readonly _promptType: PromptType;
  private readonly _promptOptions: Array<{label: string; value: string | number}>;
  private readonly _validators: Array<ValidatorFn>;
  private readonly _title: string;
  private readonly _defaultValue: string;
  private readonly _message: string;
  private readonly _messageAfter: string;
  private readonly _placeholder: string;
  private readonly _size: SystemSizeType;
  private readonly _theme: SystemThemeType;
  private readonly _acceptLabel: string;
  private readonly _refuseLabel: string;
  private readonly _closable: boolean;
  private readonly _loading: boolean;
  private readonly _callback: (confirm: string) => Observable<any> | undefined | void;


  constructor(prompt: PromptOptions, callback: (answer: string) => Observable<any> | undefined | void) {
    this._promptType = prompt.promptType;
    this._promptOptions = prompt.promptOptions;
    this._validators = prompt.validators;
    this._title = prompt.title;
    this._defaultValue = prompt.defaultValue;
    this._message = prompt.message;
    this._messageAfter = prompt.messageAfter;
    this._placeholder = prompt.placeholder;
    this._size = prompt.size;
    this._theme = prompt.theme;
    this._acceptLabel = prompt.acceptLabel;
    this._refuseLabel = prompt.refuseLabel;
    this._closable = prompt.closable;
    this._loading = prompt.loading;
    this._callback = callback;
  }


  get promptType() {
    return this._promptType;
  }


  get promptOptions() {
    return this._promptOptions;
  }


  get validators() {
    return this._validators;
  }


  get title() {
    return this._title;
  }


  get defaultValue() {
    return this._defaultValue;
  }


  get message() {
    return this._message;
  }


  get messageAfter() {
    return this._messageAfter;
  }


  get placeholder() {
    return this._placeholder;
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


  get loading(): boolean {
    return this._loading;
  }


  get callback(): (answer: string) => Observable<any> | undefined | void {
    return this._callback;
  }

}
