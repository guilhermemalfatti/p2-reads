import axios from "axios";
import ActionCreator from './actionCreators';
import token from '../config/config';
import { API_ENDPOINT } from '../config/config';

const options = { headers: { "Authorization": token } };

/**
 * Method responsible for get the comments by post id
 * @param {*} postId the post id
 */
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

/**
 * Method responsible for edit a comment
 * @param {*} commentId  The comment Id
 * @param {*} values The values
 */
export function editComment(commentId, values) {
    return (dispatch) => {
        dispatch(ActionCreator.editComment(commentId, values));
        axios.put(API_ENDPOINT.READABLE_STARTER + '/comments/' + commentId, values, options)
            .catch((err) => {
                alert('There was an error on editComment, the data is inconsistent, refresh and try again. ' + err)
            });
    }
}

/**
 * Method responsible for create a new comment
 * @param {*} values The values
 */
export function newComment(values) {
    //if there is no author, add ananymous value
    if (!values.author) {
        values['author'] = 'anonymous'
    }
    return (dispatch) => {
        axios.post(API_ENDPOINT.READABLE_STARTER + '/comments', values, options)
            .then((res) => {
                dispatch(ActionCreator.addComment(res.data));
            })
            .catch((err) => {
                alert('There was an error on newComment, the data is inconsistent, refresh and try again. ' + err)
            });
    }
}

/**
 * Method responsible for delete  a comment
 * @param {*} comment The comment
 */
export function deleteComment(comment) {
    return (dispatch) => {
        //remove from state
        dispatch(ActionCreator.deleteComment(comment));
        axios.delete(API_ENDPOINT.READABLE_STARTER + '/comments/' + comment.id, options)
            .catch((err) => {
                alert('There was an error on delete a comment, the data is inconsistent, refresh and try again. ' + err)
            });
    }
}

/**
 * Method responsible for add a vote in a comment
 * @param {*} comment The comment
 * @param {*} vote The vote
 */
export function commentVote(comment, vote) {
    return (dispatch) => {
        //that aims to avoid an if/else statement
        dispatch(ActionCreator[vote](comment));

        return axios.post(
            API_ENDPOINT.READABLE_STARTER + '/comments/' + comment,
            { "option": vote },
            options)
            .catch((err) => alert('There was an error, the data is inconsistent, refresh the page and try again. ' + err))
    }
}