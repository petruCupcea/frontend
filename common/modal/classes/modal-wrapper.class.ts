import * as _ from 'lodash';
import { ResizeSensor } from 'css-element-queries';

import { detach } from 'common/core';

import { ModalActionsType, ModalEventsType } from '../types';
import { ModalParamsModel } from '../structures';

declare const $: any;


export class ModalWrapper {

  element: any;
  private resizeSensor: ResizeSensor;
  private modalOptions: any;
  private readonly onDestroyCallback: (modalId: string) => void;


  constructor(public id: string, htmlElement: Element, onDestroyCallback?: (modalId: string) => void) {
    this.modalOptions = {};
    this.element = $(htmlElement);
    this.onDestroyCallback = onDestroyCallback;
  }


  setParams(options: ModalParamsModel) {
    _.assign(this.modalOptions, options);
    this.element.modal(this.modalOptions);
  }


  resetParams() {
    this.modalOptions = {};
    this.element.modal(this.modalOptions);
  }


  on(eventName: ModalEventsType, callback: () => void): any {
    // tranform 'hide' -> 'onHide';
    const event = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
    const eventObj = {};
    eventObj[event] = callback;
    _.assign(this.modalOptions, eventObj);

    return this.element.modal(this.modalOptions);
  }


  action(actionName: ModalActionsType): any {
    this.modalRefreshOnShow(actionName);

    return this.element.modal(actionName);
  }


  destroy() {
    this.action('hide');
    this.onDestroyCallback(this.id);
    detach(() => {
      this.element.remove();
    });
  }


  private modalRefreshOnShow(actionName: ModalActionsType) {
    if (actionName === 'show') {
      this.refresh();
      this.resizeSensor = this.refreshOnResize(this.element);
    } else if (actionName === 'hide' && this.resizeSensor) {
      this.resizeSensor.detach();
    }
  }


  private refreshOnResize(element: any): ResizeSensor {
    const resizeSensor = new ResizeSensor(element, () => {
      this.refresh();
    });

    return resizeSensor;
  }


  private refresh() {
    detach(() => {
      this.action('refresh');
    });
  }

}
