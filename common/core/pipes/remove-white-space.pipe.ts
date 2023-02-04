import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'removeWhiteSpace',
})
export class RemoveWhiteSpacePipe implements PipeTransform {

  transform(word: string): string {
    if (!word) {
      return '';
    }

    return word.replace(/ /g, '');
  }

}
