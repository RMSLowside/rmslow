import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';

@Component({
  selector: 'rms-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css']
})
export class RangeComponent {

  @Input() query: string;
  @Output() dateEmit = new EventEmitter<string>();
  startDate: Date;
  endDate: Date;
  minSDate: Date;
  maxSDate: Date;
  minEDate: Date;
  maxEDate: Date;
  sDate: string;
  eDate: string;

  constructor() {
    this.startDate = new Date(2010, 0, 1);
    this.endDate = new Date();
    this.minSDate = new Date(1970, 0, 1);
    this.minEDate = new Date(1970, 0, 1);
    this.maxSDate = new Date();
    this.maxEDate = new Date();
  }

  updateStart(event: MatDatepickerInputEvent<Date>){
    this.startDate = event.value;
    this.minEDate = event.value;
    this.sDate = `${this.startDate.getFullYear()}-${this.startDate.getMonth()}-${this.startDate.getDate()}`;
    this.eDate = `${this.endDate.getFullYear()}-${this.endDate.getMonth()}-${this.endDate.getDate()}`;
    this.dateEmit.emit(this.query.replace("\[D\]", `RANGE(${this.sDate}, ${this.eDate})`));
  }

  updateEnd(event: MatDatepickerInputEvent<Date>){
    this.endDate = event.value;
    this.maxSDate = event.value;
    this.sDate = `${this.startDate.getFullYear()}-${this.startDate.getMonth()}-${this.startDate.getDate()}`;
    this.eDate = `${this.endDate.getFullYear()}-${this.endDate.getMonth()}-${this.endDate.getDate()}`;
    this.dateEmit.emit(this.query.replace("\[D\]", `RANGE(${this.sDate}, ${this.eDate})`));
  }

}
