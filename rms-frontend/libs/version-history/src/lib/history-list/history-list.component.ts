import { Component, OnInit, Input } from '@angular/core';
import { VersionHistory } from '../version-history';

@Component({
  selector: 'rms-frontend-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() histories: VersionHistory[];
  @Input() canEdit: boolean;
  constructor() {}

  ngOnInit(): void {}
}
