import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'accountsFilterByBalance',
})
export class AccountsFilterByBalancePipe implements PipeTransform {

  transform(list: Array<any>, notNullFlag: boolean): Array<any> {
    const result = _.merge([], list);

    _.each(list, (value, key) => {
      result[key].accounts = _.filter(value.accounts, (item) => {
        if (notNullFlag) {
          return (item.account.balance !== 0);
        } else {
          return true;
        }
      });
    });

    return result;
  }

}
