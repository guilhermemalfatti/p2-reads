import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getCategories from '../categories';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('categories', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });


    it('get categories', async () => {
        var expectResult = {
            categories: {1:1}

         };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectResult,
            });
        });

        const store = mockStore();
        await store.dispatch(getCategories());
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "RECEIVE_CATEGORIES", categories: expectResult.categories});

    });


});