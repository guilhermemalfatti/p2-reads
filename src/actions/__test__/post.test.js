import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { selectPost, deletePost, editPost, addPost } from '../post';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('post actions', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });


    it('New post', async () => {
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
        await store.dispatch(addPost({}, history));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "REQUEST_DATA" });
        expect(actions[1]).toEqual({ type: "ADD_POST", post: expectResult });
        expect(actions[2]).toEqual({ type: "DATA_RECEIVED" });

    });

    it('select post after successfuly fetching it', async () => {
        var expectResult = { 1: 1 };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectResult,
            });
        });

        const store = mockStore();
        await store.dispatch(selectPost(1));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "REQUEST_DATA" });
        expect(actions[1]).toEqual({ type: "SELECT_POST", post: expectResult });

    });



    it('Delete a post action', async () => {

        const store = mockStore();
        await store.dispatch(deletePost(1));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "DELETE_POST", postId: 1 });

    });

    it('edit a post action', async () => {

        const store = mockStore();
        await store.dispatch(editPost(1,2));
        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: "EDIT_POST", values: 1, id: 2});

    });
});