import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Login } from './auth.actions';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';
import { AuthService } from '../../auth.service';
import { Injectable } from '@angular/core';

export interface AuthStateModel {
  authourized: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    authourized: undefined
  }
})
@Injectable()
export class AuthState {
  constructor(public authService: AuthService) {}
  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.authourized;
  }

  @Action(Login)
  @ImmutableContext()
  public login(ctx: StateContext<AuthStateModel>, {}: Login) {
    const stateModel = ctx.getState();
    this.authService.login().subscribe(a => {
      stateModel.authourized = a;
      ctx.setState(stateModel);
    });
  }
}
