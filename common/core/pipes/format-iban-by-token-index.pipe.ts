import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'formatIbanByTokenIndex',
})
export class FormatIbanByTokenIndexPipe implements PipeTransform {

  transform(value: any, params?: Array<number>): any {
    if (!params || params.length === 0) {
      return value;
    }

    let newIban = '';
    let ibanIndex = 0;

    params.forEach((item: number) => {
      newIban += value.slice(ibanIndex, item);
      ibanIndex = item + 1;
      newIban += '<span>' + value[item] + '</span>';
    });

    newIban += value.slice(ibanIndex);

    return newIban;
  }

}
