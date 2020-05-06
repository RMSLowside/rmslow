import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateService } from '../date.service';
import { Select, Store } from '@ngxs/store';
import { QueryState } from '../+state/query.state';
import { Observable } from 'rxjs';
import { updateEndQuery } from '../+state/query.actions';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'rms-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {
  currentStartQuery: string;
  startDate: Date;
  endDate: Date;
  minSDate: Date;
  maxSDate: Date;
  minEDate: Date;
  maxEDate: Date;
  sDate: string;
  eDate: string;
  service: DateService;

  selectedType: string;
  types: string[] = ['Type A', 'Type B', 'Type C'];
  beginning: Date = new Date(2010, 0, 1);
  today: Date = new Date();

  @Select(QueryState.endQuery) endQuery$: Observable<string>;

  constructor(public store: Store, dservice: DateService) {
    this.startDate = this.beginning;
    this.endDate = this.today;
    this.minSDate = new Date(1970, 0, 1);
    this.minEDate = new Date(1970, 0, 1);
    this.maxSDate = new Date();
    this.maxEDate = new Date();
    this.service = dservice;
    this.selectedType = this.types[0];
  }

  updateStart(event: MatDatepickerInputEvent<Date>){
    this.startDate = event.value;
    this.minEDate = event.value;
    this.sDate = this.service.calcDate(this.startDate);
    this.eDate = this.service.calcDate(this.endDate);
    this.store.dispatch(new updateEndQuery(this.service.buildDateString(this.currentStartQuery, this.startDate, this.endDate, this.selectedType)));
  }

  updateEnd(event: MatDatepickerInputEvent<Date>){
    this.endDate = event.value;
    this.maxSDate = event.value;
    this.sDate = this.service.calcDate(this.startDate);
    this.eDate = this.service.calcDate(this.endDate);
    this.store.dispatch(new updateEndQuery(this.service.buildDateString(this.currentStartQuery, this.startDate, this.endDate, this.selectedType)));
  }

  update(){
    this.store.dispatch(new updateEndQuery(this.service.buildDateString(this.currentStartQuery, this.startDate, this.endDate, this.selectedType)));
  }

  updateType(event: MatRadioChange){
    this.selectedType = event.value;
    this.store.dispatch(new updateEndQuery(this.service.buildDateString(this.currentStartQuery, this.startDate, this.endDate, this.selectedType)));
  }

}
