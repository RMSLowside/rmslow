import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ChartsState, ChartsStateModel } from './charts.state';
import { ChartsAction } from './charts.actions';

describe('Charts store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ChartsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: ChartsStateModel = {
      items: ['item-1']
    };
    store.dispatch(new ChartsAction('item-1'));
    const actual = store.selectSnapshot(ChartsState.getState);
    expect(actual).toEqual(expected);
  });

});
