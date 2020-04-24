import { State, Action, Selector, StateContext } from '@ngxs/store';
import { QueryAction } from './query.actions';

export interface QueryStateModel {
  items: string[];
}

@State<QueryStateModel>({
  name: 'query',
  defaults: {
    items: []
  }
})
export class QueryState {

  @Selector()
  public static getState(state: QueryStateModel) {
    return state;
  }

  @Action(QueryAction)
  public add(ctx: StateContext<QueryStateModel>, { payload }: QueryAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
