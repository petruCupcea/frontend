import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

declare const $: any;


@Directive({
  selector: '.ui.dropdown.label, .ui.dropdown',
})
export class DropdownDirective implements OnInit, AfterViewInit {

  @Input() set disabled(value: boolean) {
    if (value) {
      $(this.element).parent().addClass('disabled');
    } else {
      $(this.element).parent().removeClass('disabled');
    }
  }

  private element: any;


  constructor(private readonly elementRef: ElementRef) {
  }


  ngOnInit() {
    this.element = this.elementRef.nativeElement;
  }


  ngAfterViewInit() {
    $(this.element).dropdown();
  }

}
