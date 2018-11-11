import axios from "axios";
import ActionCreator from './actionCreators';
import token from '../config/config';
import { API_ENDPOINT } from '../config/config';

const uuidv4 = require('uuid/v4');
const options = { headers: { "Authorization": token } };

export function getComments(postId) {
    return (dispatch) => {
        dispatch(ActionCreator.requestData());
        axios.get(API_ENDPOINT.READABLE_STARTER + '/posts/' + postId + "/comments", options)
            .then((res) => {
                dispatch(ActionCreator.getComments(res.data));
                dispatch(ActionCreator.dataReceived());
            })
            .catch((err) => {
                alert('There was an error on getComments, the data is inconsistent, refresh and try again. ' + err)
            });
    }
}


export function editComment(commentId, values) {
    return (dispatch) => {
        dispatch(ActionCreator.editComment(commentId, values));
        axios.put(API_ENDPOINT.READABLE_STARTER + '/comments/' + commentId, values, options)
            .catch((err) => {
                alert('There was an error on editComment, the data is inconsistent, refresh and try again. ' + err)
            });
    }
}

/* export function newComment(postId) {
    return (dispatch) => {
        axios.get(API_ENDPOINT.READABLE_STARTER + '/posts/' + postId + "/comments", options)
            .then((res) => {

            })
            .catch((err) => {
                alert('There was an error on newComment, the data is inconsistent, refresh and try again. ' + err)
            });
    }
} */