import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SetTheme } from './global.actions';
import { Injectable } from '@angular/core';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';

export interface GlobalStateModel {
  theme: string;
}

@State<GlobalStateModel>({
  name: 'global',
  defaults: {
    theme: 'light'
  }
})
@Injectable()
export class GlobalState {
  @Selector()
  public static getTheme(state: GlobalStateModel) {
    return state.theme;
  }

  @Action(SetTheme)
  @ImmutableContext()
  public setTheme(ctx: StateContext<GlobalStateModel>, { theme }: SetTheme) {
    const stateModel = ctx.getState();
    stateModel.theme = theme;
    ctx.setState(stateModel);
  }
}
