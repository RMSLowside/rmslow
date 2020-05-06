import { State, Action, Selector, StateContext } from '@ngxs/store';
import { updateEndQuery } from './query.actions';
import { Injectable } from '@angular/core';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';

export interface QueryStateModel {
  startQuery: string;
  startDate: Date;
  endDate: Date;
  queryType: string;
  endQuery: string;
}
@State<QueryStateModel>({
  name: 'query',
  defaults: {
    startQuery: "",
    startDate: null,
    endDate: null,
    queryType: "",
    endQuery: ""
  }
})
@Injectable()
export class QueryState {

  @Selector()
  public static startQuery(state: QueryStateModel) {
    return state.startQuery;
  }

  @Selector()
  public static startDate(state: QueryStateModel) {
    return state.startDate;
  }

  @Selector()
  public static endDate(state: QueryStateModel) {
    return state.endDate;
  }

  @Selector()
  public static queryType(state: QueryStateModel) {
    return state.queryType;
  }

  @Selector()
  public static endQuery(state: QueryStateModel) {
    return state.endQuery;
  }


  // @Action(updateStartQuery)
  // public updateStartQuery(ctx: StateContext<QueryStateModel>, { payload }: updateStartQuery) {
  //   const stateModel = ctx.getState();
  //   stateModel.startQuery = payload;
  //   ctx.setState(stateModel);
  // }

  // @Action(updateStartDate)
  // public updateStartDate(ctx: StateContext<QueryStateModel>, { payload }: updateStartDate) {
  //   const stateModel = ctx.getState();
  //   stateModel.startDate = payload;
  //   ctx.setState(stateModel);
  // }

  // @Action(updateEndDate)
  // public updateEndDate(ctx: StateContext<QueryStateModel>, { payload }: updateEndDate) {
  //   const stateModel = ctx.getState();
  //   stateModel.endDate = payload;
  //   ctx.setState(stateModel);
  // }

  // @Action(updateQueryType)
  // public updateQueryType(ctx: StateContext<QueryStateModel>, { payload }: updateQueryType) {
  //   const stateModel = ctx.getState();
  //   stateModel.queryType = payload;
  //   ctx.setState(stateModel);
  // }

  @Action(updateEndQuery)
  @ImmutableContext()
  public updateEndQuery(ctx: StateContext<QueryStateModel>, { payload }: updateEndQuery) {
    ctx.setState((hereState: QueryStateModel) => {
      hereState.endQuery = payload;
      return hereState;
    });
  }
}
