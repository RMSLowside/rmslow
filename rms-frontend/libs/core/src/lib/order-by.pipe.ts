import { Pipe, PipeTransform } from '@angular/core';
import sortBy from 'lodash-es/sortBy';
import orderBy from 'lodash-es/orderBy';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], desc: boolean, column): any[] {
    if (!value) {
      return value;
    } // no array

    if (!column || column === '') {
      return sortBy(value.toString().toLowerCase());
    } // sort 1d array

    if (value.length <= 1) {
      return value;
    } // array with only one item

    return orderBy(
      value,
      [val => val[column].toString().toLowerCase()],
      [desc]
    );
  }
}
