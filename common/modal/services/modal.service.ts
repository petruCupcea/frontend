import { Injectable } from '@angular/core';

import { ModalWrapper } from '../classes';


@Injectable()
export class ModalService {

  private readonly storage: {[id: string]: ModalWrapper};


  constructor() {
    this.storage = {};
  }


  use(id: string): ModalWrapper {
    return this.storage[id];
  }


  create(id: string, htmlElement: Element, destroyCallback?: () => void): ModalWrapper {
    const modalObj = new ModalWrapper(id, htmlElement, this.onDestroy(destroyCallback));
    this.storage[id] = modalObj;

    return modalObj;
  }


  destroy(id: string) {
    const modalObj = this.storage[id];
    if (modalObj) {
      modalObj.destroy();
    }
  }


  private onDestroy(destroyCallback?: () => void): (id: string) => void {
    return (id: string) => {
      if (destroyCallback) {
        destroyCallback();
      }
      delete this.storage[id];
    };
  }

}
