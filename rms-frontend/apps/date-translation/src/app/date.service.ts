import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  calcDate(date: Date){
    let result: string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return result;
  }

  buildDateString(query:string, start: Date, end: Date, type: string){
    let sDate = this.calcDate(start);
    let eDate = this.calcDate(end);

    if(type == "A") return query.replace("\[D\]", `RANGE(${sDate}, ${eDate})`);
    else if(type == "B") return query.replace("\[D\]", `laterThan(${sDate})`);
    else return query.replace("\[D\]", `earlierThan(${eDate})`);
  }
}
