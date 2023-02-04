import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { Environment } from '../classes';


@Pipe({
  name: 'dateWrapper',
})
export class DateWrapperPipe implements PipeTransform {

  static readonly format = 'dd MMM yyyy';


  constructor(
    private readonly environment: Environment,
  ) {
  }


  transform(value: any, params?: string): string {
    let result;
    const dateFormat = params || DateWrapperPipe.format;
    const datePipe = new DatePipe(this.environment.defaultLang);

    try {
      const timezone = (value.indexOf('.') !== -1) ? 'Z' : '';
      result = datePipe.transform(value + timezone, dateFormat);
    } catch (err) {
      result = value;
    }

    return result;
  }

}
