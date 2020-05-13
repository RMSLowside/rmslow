import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], desc: boolean, column): any[] {
    if (!value) {
      return value;
    } // no array

    if (!column || column === '') {
      return _.sortBy(value.toString().toLowerCase());
    } // sort 1d array

    if (value.length <= 1) {
      return value;
    } // array with only one item

    return _.orderBy(
      value,
      [
        val => {
          if (val[column] instanceof Date && !isNaN(val[column].valueOf()))
            return val[column];
          return val[column].toString().toLowerCase();
        }
      ],
      [desc]
    );
  }
}
