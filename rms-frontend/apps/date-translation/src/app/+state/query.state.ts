import { State, Action, Selector, StateContext } from '@ngxs/store';
import { updateEndQuery } from './query.actions';
import { Injectable } from '@angular/core';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';

export interface QueryStateModel {
  endQuery: string;
}
@State<QueryStateModel>({
  name: 'query',
  defaults: {
    endQuery: ""
  }
})
@Injectable()
export class QueryState {

  @Selector()
  public static endQuery(state: QueryStateModel) {
    return state.endQuery;
  }

  @Action(updateEndQuery)
  @ImmutableContext()
  public updateEndQuery(ctx: StateContext<QueryStateModel>, { payload }: updateEndQuery) {
    ctx.setState((hereState: QueryStateModel) => {
      hereState.endQuery = payload;
      return hereState;
    });
  }
}
