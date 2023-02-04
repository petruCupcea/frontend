import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'amountWithoutDecimals',
})
export class AmountWithoutDecimalsPipe implements PipeTransform {

  static readonly format = '.0-0';


  constructor(private readonly decimalPipe: DecimalPipe) {
  }


  transform(value: number | string): string {
    if (!value) {
      return undefined;
    }

    const expectedValue = parseInt(value.toString().split('.')[0], 10);
    let result;

    try {
      result = this.decimalPipe.transform(expectedValue, AmountWithoutDecimalsPipe.format);
    } catch (err) {
    }

    return result;
  }

}
