import { AfterViewInit, Directive, ElementRef } from '@angular/core';

declare const $: any;


@Directive({
  selector: '[prevent-autofill]',
})
export class PreventAutofillDirective implements AfterViewInit {

  constructor(
    private readonly elementRef: ElementRef,
  ) {
  }


  ngAfterViewInit() {
    const currentInput = $(this.elementRef.nativeElement);
    const fakeInput = '<input type="' + currentInput.attr('type') + '" class="fake-password" tabindex="-1">';
    currentInput.before($(fakeInput));
    this.relocateFloatingLabelIfExists(currentInput, fakeInput);
  }


  private relocateFloatingLabelIfExists(input: any, receivedFakeInput: any) {
    const parent = input.parent();
    const fakeInput = $(receivedFakeInput);
    const floatingLabel = parent.children('.fl__');
    if (floatingLabel.length) {
      floatingLabel.after(fakeInput);
    } else {
      input.after(fakeInput);
    }
  }

}
