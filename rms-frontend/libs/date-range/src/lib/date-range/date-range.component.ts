import { Component, Output, EventEmitter } from '@angular/core';
import { KeyValue } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'rms-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
export class DateRangeComponent {

  currentStartQuery: string;
  startDate: Date;
  endDate: Date;
  minSDate: Date;
  maxSDate: Date;
  minEDate: Date;
  maxEDate: Date;

  @Output() dateEmitter = new EventEmitter<KeyValue<Date, Date>>();

  beginning: Date = new Date(2010, 0, 1);
  end: Date = new Date();

  constructor() {
    this.startDate = this.beginning;
    this.endDate = this.end;
    this.minSDate = new Date(1970, 0, 1);
    this.minEDate = new Date(1970, 0, 1);
    this.maxSDate = new Date();
    this.maxEDate = new Date();
  }

  updateStart(event: MatDatepickerInputEvent<Date>){
    this.startDate = event.value;
    this.minEDate = event.value;
    this.emit();
  }

  updateEnd(event: MatDatepickerInputEvent<Date>){
    this.endDate = event.value;
    this.maxSDate = event.value;
    this.emit();
  }

  emit(){
    let output: KeyValue<Date, Date> = {"key": this.startDate, "value": this.endDate};
    this.dateEmitter.emit(output);
  }

}
