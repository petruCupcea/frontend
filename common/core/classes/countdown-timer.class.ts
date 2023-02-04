import * as _ from 'lodash';
import { interval , Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';


export class CountdownTimer {

  private readonly _id: string;
  private readonly _timer: Observable<any>;


  constructor(id: string, time: string) {
    let seconds = _.isNaN(parseInt(time, 10)) ? 0 : (parseInt(time, 10));
    this._id = id;

    if (seconds && seconds > 0) {
      this._timer = interval(1000)
        .pipe(
          take(seconds),
          map(() => {
            seconds--;

            return seconds;
          }),
          startWith(-1),
        );
    }
  }


  get id(): string {
    return this._id;
  }


  get timer() {
    return this._timer;
  }

}
