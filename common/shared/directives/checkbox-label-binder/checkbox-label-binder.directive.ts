import { Directive, ElementRef, OnInit } from '@angular/core';

import { idGenerator } from 'common/core';


@Directive({
  selector: '.ui.checkbox',
})
export class CheckboxLabelBinderDirective implements OnInit {

  constructor(private readonly elementRef: ElementRef) {
  }


  ngOnInit() {
    const element = this.elementRef.nativeElement;
    const checkbox = element.querySelector('input');
    const label = element.querySelector('label');

    if (!checkbox || !label) {
      return;
    }

    let id = checkbox.id;
    if (!id) {
      id = idGenerator('ch-');
      checkbox.setAttribute('id', id);
    }
    label.setAttribute('for', id);
  }

}
