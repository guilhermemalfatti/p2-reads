import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import receiveInitialData from '../shared';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shared actions', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });


    it('Initial data', async () => {
        var expectResult = { 1: 1 };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectResult,
            });
        });

        var history = {
            push: ()=>{}
        }

        const store = mockStore();
        await store.dispatch(receiveInitialData("category"));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "INITIAL_DATA", posts: expectResult, filter: "category" });

    });
});