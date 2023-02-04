import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'secondsToMinutes',
})
export class SecondsToMinutesPipe implements PipeTransform {

  constructor() {
  }


  addZero(nr: number): string {
    const n = (nr < 10) ? '0' + nr : nr;

    return n.toString();
  }


  transform(seconds: number): string {
    const minutes =  Math.floor(seconds / 60);
    const remainingSeconds = seconds - (minutes * 60);

    return this.addZero(minutes) + ':' + this.addZero(remainingSeconds);
  }

}
