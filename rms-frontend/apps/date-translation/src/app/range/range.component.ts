import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateService } from '../date.service';
import { Select, Store } from '@ngxs/store';
import { QueryState } from '../+state/query.state';
import { Observable } from 'rxjs';
import { updateEndQuery } from '../+state/query.actions';

@Component({
  selector: 'rms-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css']
})
export class RangeComponent implements OnDestroy {
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

  @Select(QueryState.startQuery) startQuery$: Observable<string>;
  @Select(QueryState.endQuery) endQuery$: Observable<string>;

  startQuerySub = this.startQuery$.subscribe(a => {
    this.currentStartQuery = a;
  });

  ngOnDestroy(): void {
    this.startQuerySub.unsubscribe();
  }

  constructor(public store: Store) {
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
    this.sDate = this.service.calcDate(this.startDate);
    this.eDate = this.service.calcDate(this.endDate);
    this.store.dispatch(new updateEndQuery(this.service.buildDateString(this.currentStartQuery, this.startDate, this.endDate, "A")));
  }

  updateEnd(event: MatDatepickerInputEvent<Date>){
    this.endDate = event.value;
    this.maxSDate = event.value;
    this.sDate = this.service.calcDate(this.startDate);
    this.eDate = this.service.calcDate(this.endDate);
    this.store.dispatch(new updateEndQuery(this.service.buildDateString(this.currentStartQuery, this.startDate, this.endDate, "A")));
  }

}
