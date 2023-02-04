import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { detach } from 'common/core';

declare const $: any;
declare const window: any;


@Directive({
  selector: '[scrollToFixed]',
})
export class ScrollToFixedDirective implements AfterViewInit, OnDestroy, OnInit {

  @Input() className: string;
  @Input() offsetElement?: number;

  private elementWidth: string;
  private offsetTop: number;
  private readonly element;
  private readonly scrollHandler: (event: any) => void;


  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {
    this.element = this.elementRef.nativeElement;
    this.className = '';
    this.offsetElement = 0;
    this.offsetTop = 0;
    this.scrollHandler = this.scroll();
  }


  ngOnInit() {
    detach(() => {
      this.elementWidth = $(this.element).outerWidth();
      this.offsetTop = $(this.element).offset().top - this.offsetElement;

      this.renderer.setStyle(this.element, 'max-width', this.elementWidth + 'px');
      window.addEventListener('scroll', this.scrollHandler, true);
    });
  }


  ngAfterViewInit() {
    detach(() => {
      if ($(this.element).hasClass(this.className)) {
        return;
      }

      const sizeY = $(window).scrollTop();
      this.headerClass(sizeY);
    });
  }


  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler, true);
  }


  private scroll() {
    return (event: any) => {
      if (!$(event.target).has($(this.element)).length) {
        return;
      }

      const sizeY = $(event.target).scrollTop();
      this.headerClass(sizeY);
    };
  }


  private headerClass(sizeY: any) {
    if (sizeY >= this.offsetTop) {
      this.renderer.addClass(this.element, this.className);
    } else if (sizeY < this.offsetTop - this.offsetElement) {
      this.renderer.removeClass(this.element, this.className);
    }
  }

}
