import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateService } from '../date.service';
import { Select, Store } from '@ngxs/store';
import { QueryState } from '../+state/query.state';
import { Observable } from 'rxjs';
import { updateEndQuery } from '../+state/query.actions';
import { MatRadioChange } from '@angular/material/radio';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'rms-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {
  currentStartQuery: string;
  startDate: Date;
  endDate: Date;
  sDate: string;
  eDate: string;
  service: DateService;

  selectedType: string;
  types: string[] = ['Type A', 'Type B', 'Type C'];

  @Select(QueryState.endQuery) endQuery$: Observable<string>;

  constructor(public store: Store, dservice: DateService) {
    this.service = dservice;
    this.selectedType = this.types[0];
  }

  updateOnEmit(dates: KeyValue<Date, Date>){
    this.startDate = dates.key;
    this.endDate = dates.value;
    this.sDate = this.service.calcDate(this.startDate);
    this.eDate = this.service.calcDate(this.endDate);
    this.update();
  }

  update(){
    this.store.dispatch(new updateEndQuery(this.service.buildDateString(this.currentStartQuery, this.startDate, this.endDate, this.selectedType)));
  }

  updateType(event: MatRadioChange){
    this.selectedType = event.value;
    this.store.dispatch(new updateEndQuery(this.service.buildDateString(this.currentStartQuery, this.startDate, this.endDate, this.selectedType)));
  }

}
