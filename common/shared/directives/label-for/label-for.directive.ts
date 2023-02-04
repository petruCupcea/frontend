import { Directive, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[labelFor]',
})
export class LabelForDirective {

  @Input('labelFor') label: string;


  constructor() {
  }


  @HostListener('click') onMouseClick() {
    const inputTypeElement = document.getElementById(this.label);
    inputTypeElement.click();
  }

}
