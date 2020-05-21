import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VersionHistory } from '../version-history';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'rms-frontend-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() histories: VersionHistory[];
  @Input() canEdit: boolean;
  @Output() revertChange = new EventEmitter<VersionHistory[]>();
  fieldFilter = new FormControl();
  userFilter = new FormControl();
  sort = new FormControl();
  constructor() {}

  ngOnInit(): void {}

  getFilter(filter: string) {
    return [...new Set(this.histories.map(a => a[filter]))];
  }
  filterHistories() {
    let filteredHistories = this.histories;
    const fieldFilters = this.fieldFilter.value;
    const userFilters = this.userFilter.value;
    if (fieldFilters?.length)
      filteredHistories = filteredHistories.filter(a =>
        fieldFilters.includes(a.field)
      );
    if (userFilters?.length)
      filteredHistories = filteredHistories.filter(a =>
        userFilters.includes(a.user)
      );
    const returnArray = [];
    let pushArray = [];
    filteredHistories.forEach((val, index) => {
      if (index === 0) {
        pushArray.push(val);
      } else {
        if (pushArray.length && pushArray[0].date === val.date)
          pushArray.push(val);
        else {
          returnArray.push(_.cloneDeep(pushArray));
          pushArray = [val];
        }
      }
      if (index === filteredHistories.length - 1)
        returnArray.push(_.cloneDeep(pushArray));
    });
    if (this.sort.value === 'desc') return returnArray.reverse();
    return returnArray;
  }
  trackByIndex(index, item) {
    return index;
  }
}
