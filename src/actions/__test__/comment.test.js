import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { editComment } from '../comment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('comment actions', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });



    it('edit comment action', async () => {

        const store = mockStore();
        await store.dispatch(editComment(1,{}));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "EDIT_COMMENT", commentId: 1, values: {}});

    });
});