import { State, Action, Selector, StateContext } from '@ngxs/store';
import { HistoryAction } from './history.actions';
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
  addFolder(ctx: StateContext<HistoryStateModel>, action: HistoryAction) {
    ctx.setState((hereState: HistoryStateModel) => {
      hereState.histories = action.histories;
      return hereState;
    });
    //Add code to send files to server here
  }
}
