import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {

  static readonly format = '.2-2';


  constructor(private readonly decimalPipe: DecimalPipe) {
  }


  transform(value: number | string, separator?: string, digitsInfo?: string): string {
    let result;

    if (typeof value === 'string') {
      value = value.replace(' ', '');
      value = parseFloat(value);
    }

    try {
      const format = (digitsInfo ? digitsInfo : AmountPipe.format);
      result = this.decimalPipe.transform(value, format);
      if (separator) {
        result = result.replace(/,/g, separator);
      }
    } catch (err) {
    }

    return result;
  }

}
