import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'calculatePercent',
})
export class CalculatePercentPipe implements PipeTransform {

  transform(value: number, total: number): number {
    const percent = (value * 100) / total;

    return percent;
  }

}
