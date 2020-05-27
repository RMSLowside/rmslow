import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ChartsAction } from './charts.actions';
import { Injectable } from '@angular/core';

export interface ChartsStateModel {
  items: string[];
}

@State<ChartsStateModel>({
  name: 'charts',
  defaults: {
    items: []
  }
})
@Injectable()
export class ChartsState {
  @Selector()
  public static getState(state: ChartsStateModel) {
    return state;
  }

  @Action(ChartsAction)
  public add(ctx: StateContext<ChartsStateModel>, { payload }: ChartsAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
