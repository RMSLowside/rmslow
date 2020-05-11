import { State, Action, Selector, StateContext } from '@ngxs/store';
import { HistoryAction, AddHistory } from './history.actions';
import { VersionHistory } from '@rms-frontend/version-history';
import { ImmutableSelector, ImmutableContext } from '@ngxs-labs/immer-adapter';
import { Injectable } from '@angular/core';

export interface HistoryStateModel {
  histories: VersionHistory[];
}

@State<HistoryStateModel>({
  name: 'history',
  defaults: {
    histories: []
  }
})
@Injectable()
export class HistoryState {
  @Selector()
  @ImmutableSelector()
  public static getHistories(state: HistoryStateModel) {
    return state.histories;
  }

  @Action(HistoryAction)
  @ImmutableContext()
  setHistories(ctx: StateContext<HistoryStateModel>, action: HistoryAction) {
    ctx.setState((hereState: HistoryStateModel) => {
      hereState.histories = action.histories;
      return hereState;
    });
    //Add code to send files to server here
  }

  @Action(AddHistory)
  @ImmutableContext()
  addHistory(ctx: StateContext<HistoryStateModel>, action: AddHistory) {
    ctx.setState((hereState: HistoryStateModel) => {
      hereState.histories.push(action.history);
      return hereState;
    });
    //Add code to send files to server here
  }
}
