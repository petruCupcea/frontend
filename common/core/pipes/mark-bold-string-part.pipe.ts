import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'markBoldStringPart',
})
export class MarkBoldStringPartPipe implements PipeTransform {

  transform(word: string, partOfString: string): string {
    if (!partOfString || !word) {
      return word;
    }

    partOfString = partOfString.toLowerCase();
    const localWord = word.toLowerCase();
    const indexOf = localWord.indexOf(partOfString);

    if (indexOf === -1) {
      return word;
    } else if (indexOf > -1) {
      const startPart = word.substring(0, indexOf);
      const middlePart = word.substring(indexOf, indexOf + partOfString.length);
      const endPart = word.substring(indexOf + partOfString.length, word.length);

      return (startPart + '<span class="highlighted-text">' + middlePart + '</span>' + endPart);
    }
  }

}
