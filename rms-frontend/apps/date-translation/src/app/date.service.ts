import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  calcDate(date: Date){
    let result: string = date != null ? `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` : "";
    return result;
  }

  buildDateString(query:string, start: Date, end: Date, type: string){
    let sDate = this.calcDate(start);
    let eDate = this.calcDate(end);
    let returnQuery = query ? query : "";

    if(type == "Type A"){
      return returnQuery.replace("\[D\]", `RANGE(${sDate}, ${eDate})`);
    }
    else if(type == "Type B"){
      return returnQuery.replace("\[D\]", `laterThan(${sDate})`);
    }
    else{
      return returnQuery.replace("\[D\]", `earlierThan(${eDate})`);
    }
  }
}
