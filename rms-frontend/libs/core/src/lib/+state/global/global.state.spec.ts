import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalState, GlobalStateModel } from './global.state';
import { SetTheme } from './global.actions';

export const DEFAULT_STATE = {
  global: {
    theme: 'light'
  }
};

describe('Global store', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GlobalState])]
    });
    store = TestBed.inject(Store);
    store.reset(DEFAULT_STATE);
  });
  it('should create an action and add an item', () => {
    const expected = 'newTheme';
    store.dispatch(new SetTheme('newTheme'));
    const actual = store.selectSnapshot(GlobalState.getTheme);
    expect(actual).toEqual(expected);
  });
});
