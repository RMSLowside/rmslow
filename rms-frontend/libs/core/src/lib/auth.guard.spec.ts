import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './+state/auth/auth.state';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useClass: { navigate: () => null } }]
    });
    guard = new AuthGuard(router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
