import ActionCreator from './actionCreators';
import { API_ENDPOINT } from '../config/config';
import axios from "axios";
import token from '../config/config';

export default function receiveInitialData() {
    return (dispatch) => {
        return axios.get(API_ENDPOINT.READABLE_STARTER + '/posts', { headers: { "Authorization": token } })
            .then((res) => {
                dispatch(ActionCreator.initialData(res.data));
            })
            .catch((err) => {
                console.error("Error on getting the data " + err)
            })
    }
}