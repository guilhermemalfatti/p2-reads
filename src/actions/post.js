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
export function selectPost(postId) {
    return (dispatch) => {
        return axios.get(
            API_ENDPOINT.READABLE_STARTER + '/posts/' + postId,
            options)
            .then((res) => {
                dispatch(ActionCreator.selectPost(res.data));
            })
            .catch((err) => alert('There was an error in selectPost(), the data is inconsistent, refresh the page and try again' + err))
    }
}

export function addPost(values,  history) {
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
            }).catch((err) => alert('There was an error on create a post, refresh and try again.' + err))
    }
}
export function editPost() {
    return (dispatch) => {
        /* return axios({
            method: "get",
            url: "https://dog.ceo/api/breeds/image/random"
        }).then((res) => {
            dispatch(ActionCreator.addPost({id:22, body:res.data.message}));
        }).catch(() => alert('There was an error. Try again.')) */
    }
}


export function deletePost() {
    return (dispatch) => {
        /* return axios({
            method: "get",
            url: "https://dog.ceo/api/breeds/image/random"
        }).then((res) => {
            dispatch(ActionCreator.addPost({id:22, body:res.data.message}));
        }).catch(() => alert('There was an error. Try again.')) */
    }
}