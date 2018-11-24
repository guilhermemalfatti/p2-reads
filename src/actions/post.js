import axios from "axios";
import ActionCreator from './actionCreators';
import token from '../config/config';
import { API_ENDPOINT } from '../config/config';

const uuidv4 = require('uuid/v4');
const options = { headers: { "Authorization": token } };

/**
 * Method responsible for vote in a post
 * @param {*} postId The post id
 * @param {*} vote the vote
 */
export function postVote(postId, vote) {
    return (dispatch) => {
        //that aims to avoid an if/else statement
        dispatch(ActionCreator[vote](postId));

        return axios.post(
            API_ENDPOINT.READABLE_STARTER + '/posts/' + postId,
            { "option": vote },
            options).catch((err) => alert('There was an error, the data is inconsistent, refresh the page and try again. ' + err))
    }
}

/**
 * Method responsible for create a new post
 * @param {*} values The values
 * @param {*} history The DOM history
 */
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
            }).catch((err) => alert('There was an error on create a post, the data is inconsistent, refresh and try again. ' + err))
    }
}

/**
 * Method responsible for edit a  post
 * @param {*} values The values
 * @param {*} id The post id
 * @param {*} history The DOM history
 */
export function editPost(values, id, history) {

    return (dispatch) => {
        dispatch(ActionCreator.editPost(values, id));
        axios.put(API_ENDPOINT.READABLE_STARTER + '/posts/' + id, values, options)
            .catch((err) => {
                alert('There was an error on edit a post, the data is inconsistent, refresh and try again. ' + err)
            });
    }
}

/**
 * Method responsible for delete a post
 * @param {*} id The post id
 */
export function deletePost(id) {
    return (dispatch) => {
        //remove from state
        dispatch(ActionCreator.deletePost(id));
        axios.delete(API_ENDPOINT.READABLE_STARTER + '/posts/' + id, options)
            .catch((err) => {
                alert('There was an error on delete a post, the data is inconsistent, refresh and try again. ' + err)
            });
    }
}

/**
 * Method responsible for return a specific post
 * @param {*} id The post id
 */
export function selectPost(id) {
    return (dispatch) => {
        dispatch(ActionCreator.requestData());
        return axios.get(API_ENDPOINT.READABLE_STARTER + '/posts/' + id, options)
            .then((res) => {
                dispatch(ActionCreator.selectPost(res.data));
            })
            .catch((err) => {
                alert('There was an error on selectPost a post, the data is inconsistent, refresh and try again. ' + err)
            });
    }
}