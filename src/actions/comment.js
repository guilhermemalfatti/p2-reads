import axios from "axios";
import ActionCreator from './actionCreators';
import token from '../config/config';
import { API_ENDPOINT } from '../config/config';

const uuidv4 = require('uuid/v4');
const options = { headers: { "Authorization": token } };

export function getComments(postId) {
    return (dispatch) => {
        dispatch(ActionCreator.requestData());
        console.log(API_ENDPOINT.READABLE_STARTER + '/posts/' + postId + "/comments");
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