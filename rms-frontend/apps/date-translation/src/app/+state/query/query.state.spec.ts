import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { QueryState, QueryStateModel } from './query.state';
import { QueryAction } from './query.actions';

describe('Query store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([QueryState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: QueryStateModel = {
      items: ['item-1']
    };
    store.dispatch(new QueryAction('item-1'));
    const actual = store.selectSnapshot(QueryState.getState);
    expect(actual).toEqual(expected);
  });

});
