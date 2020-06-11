import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor() {}

  sessionLog: BehaviorSubject<string[]> = new BehaviorSubject([]);

  log(message: string) {
    this.sessionLog.next([...this.sessionLog.value, message]);
  }
}
