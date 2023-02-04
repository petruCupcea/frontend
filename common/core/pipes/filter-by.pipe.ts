import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';


/*
 * Filters by a key matching a value in a collection
 * Usage:
 *  docsArray = [{
 *      category : 'dom'
 *  },{
 *      category : 'fx'
 *  }]
 *
 *   docsArray | filterBy:'category':'fx';
*/
@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {

  transform(list: Array<any>, key: string, value: any): Array<any> {
    return _.filter(list, (o) => {
      return o[key] === value;
    });
  }

}
