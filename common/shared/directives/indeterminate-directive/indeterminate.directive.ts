import { Directive, ElementRef, Input } from '@angular/core';


declare const $: any;


@Directive({
  selector: '.ui.master.checkbox',
})
export class IndeterminateDirective {

  @Input() set indeterminate(value: boolean) {
    this._indeterminate = value;
    if (!value && !this._checked) {
      $(this.element).checkbox('set unchecked');
    } else if (value) {
      $(this.element).checkbox('set indeterminate');
    } else {
      $(this.element).checkbox('set determinate');
    }
  }
  @Input() set isChecked(value: boolean) {
    this._checked = value;
    if (value && !this._indeterminate) {
      $(this.element).checkbox('set checked');
    } else if (!this._indeterminate) {
      $(this.element).checkbox('set unchecked');
    }
  }

  element: any;
  private _checked: boolean;
  private _indeterminate: boolean;


  constructor(private readonly elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

}
