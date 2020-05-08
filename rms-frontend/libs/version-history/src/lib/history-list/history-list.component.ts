import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VersionHistory } from '../version-history';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'rms-frontend-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() histories: VersionHistory[];
  @Input() canEdit: boolean;
  @Output() revertChange = new EventEmitter<VersionHistory>();
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
    return filteredHistories;
  }
}
