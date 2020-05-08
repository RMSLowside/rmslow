import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HistoryState, HistoryStateModel } from './history.state';
import { HistoryAction } from './history.actions';

describe('History store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([HistoryState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: HistoryStateModel = {
      items: ['item-1']
    };
    store.dispatch(new HistoryAction('item-1'));
    const actual = store.selectSnapshot(HistoryState.getState);
    expect(actual).toEqual(expected);
  });

});
