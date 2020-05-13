import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VersionHistory } from '../version-history';
import { Observable } from 'rxjs';

@Component({
  selector: 'rms-frontend-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.css']
})
export class HistoryModalComponent implements OnInit {
  @Output() revertChange = new EventEmitter<VersionHistory>();
  histories: Observable<VersionHistory[]>;
  canEdit: boolean;
  constructor() {}

  ngOnInit(): void {}

  emit(history: VersionHistory) {
    this.revertChange.emit(history);
  }
}
