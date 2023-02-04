import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[highlightDigits]',
})
export class HighlightDigitsDirective {

  @Input('highlightDigits') set amount(value: number | string) {
    let handledValue: any = value;
    if (typeof value === 'number') {
      handledValue = handledValue.toString();
    }
    this._amount = handledValue;
    this.setHighlightToAmount();
  }

  private _amount: string;
  private readonly highlightLimit: number;
  private readonly highFontAmountLimit: number;


  constructor(private  readonly element: ElementRef, private readonly renderer: Renderer2) {
    this.highlightLimit = 6;
    this.highFontAmountLimit = 100000000;
  }


  private setHighlightToAmount() {
    if (this._amount) {
      this.element.nativeElement.innerHTML = this.getHighlightedAmount();
    }
    if (this._amount && this.castToNumber(this._amount) >= this.highFontAmountLimit) {
      this.renderer.addClass(this.element.nativeElement, 'small-font');
    }
  }


  private getHighlightedAmount(): string {
    const castedAmount = this._amount;
    const markedPart = castedAmount.slice(0, this.getLastHighlightDigitIndex(castedAmount) + 1);
    const unmarkedPart = castedAmount.slice(markedPart.length, castedAmount.length);

    return `<span>${markedPart}</span>${unmarkedPart}`;
  }


  private getLastHighlightDigitIndex(digits: string): number {
    let index;
    let counter = 0;

    for (let i = 0; i < digits.length; i++) {
      if (digits[i] !== ' ' && digits[i] !== '.') {
        counter++;
        index = i;
      }
      if (counter === this.highlightLimit) {
        break;
      }
    }

    return index;
  }


  private castToNumber(value: string | number): number {
    const removedWhitespaces = value.toString().replace(/ /g, '');
    const castedAmount = parseFloat(removedWhitespaces);

    return castedAmount;
  }

}
