import { Component, OnInit, Input } from '@angular/core';
import { VersionHistory } from '../version-history';

@Component({
  selector: 'rms-frontend-history-segment',
  templateUrl: './history-segment.component.html',
  styleUrls: ['./history-segment.component.scss']
})
export class HistorySegmentComponent implements OnInit {
  constructor() {}
  @Input() history: VersionHistory;
  @Input() canEdit: boolean;

  ngOnInit(): void {}
}
