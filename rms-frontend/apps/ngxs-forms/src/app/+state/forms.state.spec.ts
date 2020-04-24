import { TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { FormState } from './forms.state';
import { SetFormsGroup, SaveToDraft } from './forms.actions';

export const DEFAULT_STATE = {
    dynamicForms: {
        formGroup: {
            model: {}
        },
        drafts: []
    }
};

describe('forms', () => {
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([FormState])]
        });
        store = TestBed.inject(Store);
        store.reset(DEFAULT_STATE);
    });

    it('save to draft', () => {
        const value: any = { "firstName": "Bombasto11", "emailAddress": "test", "brave": "" };
        const expectedValue: any = [{ "model": { "firstName": "Bombasto11", "emailAddress": "test", "brave": "" } }];
        let draft = store.selectSnapshot(state => state.dynamicForms.drafts);
        expect(draft).toEqual([]);

        store.dispatch(new SaveToDraft(value));
        draft = store.selectSnapshot(state => state.dynamicForms.drafts);
        expect(draft).toEqual(expectedValue);
    });

    it('set forms group', () => {
        const value: any = { "firstName": "Bombasto11", "emailAddress": "test", "brave": "" };
        const expectedValue: any = { "model": { "firstName": "Bombasto11", "emailAddress": "test", "brave": "" } };
        let draft = store.selectSnapshot(state => state.dynamicForms.formGroup);
        expect(draft).toEqual({ "model": {} });

        store.dispatch(new SetFormsGroup(value));
        draft = store.selectSnapshot(state => state.dynamicForms.formGroup);
        expect(draft).toEqual(expectedValue);
    });
});
