import { Pipe, PipeTransform } from '@angular/core';
import sortBy from 'lodash-es/sortBy';
import orderBy from 'lodash-es/orderBy';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], desc: boolean, column: string = ''): any[] {
    if (!value) {
      return value;
    } // no array

    if (!column || column === '') {
      return sortBy(value);
    } // sort 1d array

    if (value.length <= 1) {
      return value;
    } // array with only one item

    return orderBy(value, [column], [desc]);
  }
}
