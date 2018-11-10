import axios from "axios";
import ActionCreator from './actionCreators';
import token from '../config/config';
import { API_ENDPOINT } from '../config/config';

const uuidv4 = require('uuid/v4');
const options = { headers: { "Authorization": token } };


export function postVote(postId, vote) {
    return (dispatch) => {
        //that aims to avoid an if/else statement
        dispatch(ActionCreator[vote](postId));

        return axios.post(
            API_ENDPOINT.READABLE_STARTER + '/posts/' + postId,
            { "option": vote },
            options).catch((err) => alert('There was an error, the data is inconsistent, refresh the page and try again' + err))
    }
}

export function addPost(values, history) {
    values['id'] = uuidv4();
    values['timestamp'] = new Date().getTime();

    return (dispatch) => {
        dispatch(ActionCreator.requestData());
        return axios.post(API_ENDPOINT.READABLE_STARTER + '/posts',
            values,
            options)
            .then((res) => {
                dispatch(ActionCreator.addPost(res.data))
                dispatch(ActionCreator.dataReceived());
                history.push('/' + res.data.category + '/' + res.data.id);
            }).catch((err) => alert('There was an error on create a post, the data is inconsistent, refresh and try again.' + err))
    }
}
export function editPost(values, id, history) {

    return (dispatch) => {
        dispatch(ActionCreator.editPost(values, id));
        axios.put(API_ENDPOINT.READABLE_STARTER + '/posts/' + id, values, options)
        .catch((err) => {
            alert('There was an error on edit a post, the data is inconsistent, refresh and try again. ' + err)
        });
    }
}


export function deletePost(id) {
    return (dispatch) => {
        //remove from state
        dispatch(ActionCreator.deletePost(id));
        axios.delete(API_ENDPOINT.READABLE_STARTER + '/posts/' + id, options)
            .catch((err) => {
                alert('There was an error on delete a post, the data is inconsistent, refresh and try again.' + err)
            });
    }
}