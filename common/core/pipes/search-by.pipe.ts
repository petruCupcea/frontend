import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchBy',
})
export class SearchByPipe implements PipeTransform {

  transform(data: Array<any>, searchValue: string, searchIn: Array<string>): Array<any> {
    if (!data || !searchValue || !searchIn) {
      return data;
    }

    return this.filterBySearch(data, searchValue, searchIn);
  }


  private filterBySearch(data: Array<any>, searchValue: string, searchIn: Array<string>): Array<any> {
    const filteredBySearch = [];
    data.forEach((item: any) => {
      const findIn: Array<string> = [];

      searchIn.forEach((searchItem: string) => {
        findIn.push(_.get(item, searchItem).toLowerCase());
      });

      findIn.forEach((findItem: string) => {
        if (findItem.indexOf(searchValue.toLowerCase()) >= 0) {
          filteredBySearch.push(item);
        }
      });
    });

    return filteredBySearch;
  }

}
