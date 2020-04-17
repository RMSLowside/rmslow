import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthState } from './+state/auth/auth.state';
import { Store, Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {}
  @Select(AuthState.isAuthenticated) authed$: Observable<boolean>;

  canLoad() {
    const sub = new Subject<boolean>();
    const loggedIn = new Subject<any>();
    this.authed$.pipe(takeUntil(loggedIn)).subscribe(a => {
      if (a !== undefined) {
        if (a) sub.next(a);
        else this.router.navigate(['unauth']);
        loggedIn.next();
      }
    });
    return sub.pipe(first());
  }
}
