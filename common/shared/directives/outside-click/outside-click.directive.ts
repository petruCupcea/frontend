import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { detach } from 'common/core';


declare const document: any;


@Directive({
  selector: '[outsideClick]',
})
export class OutsideClickDirective implements OnDestroy, OnInit {

  @Output() outsideClick: EventEmitter<Event>;

  private readonly onClickHandler: (event: any) => void;
  private readonly onTabHandler: (event: any) => void;


  constructor(private readonly elementRef: ElementRef) {
    this.outsideClick = new EventEmitter<Event>();
    this.onClickHandler = this.onClick();
    this.onTabHandler = this.onTab();
  }


  ngOnInit() {
    // scenario:
    //   - a click on a DOM element results in the addition to the DOM of an element that has this attribute directive
    // consequence:
    //   - if we don't use detach, the handler is added tot the handlers of the click in the scenario and
    //     this.onClick is called
    detach(() => {
      document.addEventListener('click', this.onClickHandler);
      document.body.addEventListener('keyup', this.onTabHandler);
    });
  }


  ngOnDestroy() {
    document.removeEventListener('click', this.onClickHandler);
    document.body.removeEventListener('keyup', this.onTabHandler);
  }


  private onClick(): (event: any) => void {
    return (event: any) => {
      if (this.elementRef && !this.elementRef.nativeElement.contains(event.target)) {
        this.outsideClick.emit(event);
      }
    };
  }


  private onTab(): (event: any) => void {
    return (event: any) => {
      // If TAB key pressed focus can be moved outside of wanted block so it should work as a click outside of element.
      if ((event.keyCode === 9)) {
        this.onClickHandler(event);
      }
    };
  }

}
