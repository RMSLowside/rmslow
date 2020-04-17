import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AuthStateModel, AuthState } from './auth.state';
import { Login } from './auth.actions';
import { AuthService } from '../../auth.service';
import { of } from 'rxjs';

export const DEFAULT_STATE = {
  auth: {
    authourized: false
  }
};

describe('Auth store', () => {
  let store: Store;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AuthState])],
      providers: [AuthService]
    });
    store = TestBed.inject(Store);
    store.reset(DEFAULT_STATE);
    service = TestBed.inject(AuthService);
  });
  it('should login', () => {
    const expected = true;
    spyOn(service, 'login').and.returnValue(of(true));
    store.dispatch(new Login());
    const actual = store.selectSnapshot(AuthState.isAuthenticated);
    expect(actual).toEqual(expected);
  });
});
