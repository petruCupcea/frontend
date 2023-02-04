import { Directive, ElementRef, OnInit } from '@angular/core';

declare const $: any;


@Directive({
  selector: '.ui.accordion',
})
export class AccordionDirective implements OnInit {

  constructor(private readonly elementRef: ElementRef) {
  }


  ngOnInit() {
    const element = this.elementRef.nativeElement;
    $(element).accordion();
  }

}
