import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rms-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() columns = [];
  @Input() data = [];

  constructor() { }

  ngOnInit(): void {
  }

}