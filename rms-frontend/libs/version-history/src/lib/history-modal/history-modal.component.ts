import { Component, OnInit } from '@angular/core';
import { VersionHistory } from '../version-history';
import { Observable } from 'rxjs';

@Component({
  selector: 'rms-frontend-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.css']
})
export class HistoryModalComponent implements OnInit {
  histories: Observable<VersionHistory[]>;
  canEdit: boolean;
  constructor() {}

  ngOnInit(): void {}

  emit(history: VersionHistory) {
    alert(`You are reverting ${history.field} to: "${history.newValue}"`);
  }
}
