import { State, Action, Selector, StateContext } from '@ngxs/store';
import { updateRulesText } from './rules.actions';
import { Injectable } from '@angular/core';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';

export interface RulesStateModel {
  rulesText: string;
}
@State<RulesStateModel>({
  name: 'rulesText',
  defaults: {
    rulesText: ""
  }
})
@Injectable()
export class RulesState {

  @Selector()
  public static rulesText(state: RulesStateModel) {
    return state.rulesText;
  }

  @Action(updateRulesText)
  @ImmutableContext()
  public updateRulesText(ctx: StateContext<RulesStateModel>, { payload }: updateRulesText) {
    ctx.setState((hereState: RulesStateModel) => {
      hereState.rulesText = payload;
      return hereState;
    });
  }
}
