import { ElementRef, Injectable } from '@angular/core';

declare const $: any;


@Injectable()
export class ScrollTo {

  headerHeight: number;
  mainBodySelector: any;


  constructor() {
    this.headerHeight = 60;
    this.mainBodySelector = $('html, body');
  }


  top() {
    this.mainBodySelector.animate({scrollTop: 0}, '500', 'swing');
  }


  element(id: string) {
    this.mainBodySelector.animate({
      scrollTop: $('#' + id).offset().top - this.headerHeight,
    }, 500);
  }


  elementRef(element: ElementRef) {
    this.mainBodySelector.animate({
      scrollTop: $(element).offset().top - this.headerHeight,
    }, 500);
  }

}
