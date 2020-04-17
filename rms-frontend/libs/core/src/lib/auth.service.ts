import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}
  login() {
    const loggedIn = true;
    return of(loggedIn).pipe(delay(2000));
  }
}
