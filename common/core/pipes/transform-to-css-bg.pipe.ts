import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'transformToCssBg',
})
export class TransformToCssBgPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return 'url(' + value + ')';
  }

}
