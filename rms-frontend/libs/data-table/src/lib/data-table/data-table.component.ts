import { Component, OnInit, Input } from '@angular/core';
import { ChartData } from '../chart-data';

@Component({
  selector: 'rms-frontend-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() data: ChartData[] = [];

  constructor() {}

  ngOnInit(): void {}
}
