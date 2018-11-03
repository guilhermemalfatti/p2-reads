import axios from "axios";
import ActionCreator from './actionCreators';
import token from '../config/config';
import { API_ENDPOINT } from '../config/config';

const options = { headers: { "Authorization": token } };


export function postVote(postId, vote) {
    return (dispatch) => {
        //that aims to avoid an if/else statement
        dispatch(ActionCreator[vote](postId));

        return axios.post(
            API_ENDPOINT.READABLE_STARTER + '/posts/' + postId,
            {"option": vote},
            options).catch((err) => alert('There was an error, the data is inconsistent, refresh the page and try again' + err))
    }
}

export function addPost() {
    return (dispatch) => {
        /* return axios({
            method: "get",
            url: "https://dog.ceo/api/breeds/image/random"
        }).then((res) => {
            dispatch(ActionCreator.addPost({id:22, body:res.data.message}));
        }).catch(() => alert('There was an error. Try again.')) */
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