import ActionCreator from './actionCreators';
import { API_ENDPOINT } from '../config/config';
import axios from "axios";
import token from '../config/config';

/**
 * Method responsible for return the initial data of the app, tha means, all the posts
 * @param {*} category The category to be filtered if exist
 */
export default function receiveInitialData(category) {
    return (dispatch) => {
        return axios.get(API_ENDPOINT.READABLE_STARTER + '/posts', { headers: { "Authorization": token } })
            .then((res) => {
                dispatch(ActionCreator.initialData(res.data, category));
            })
            .catch((err) => {
                console.error("Error on getting the data " + err)
            })
    }
}