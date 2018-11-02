import ActionCreator from './actionCreators';
import { API_ENDPOINT } from '../config/config';
import axios from "axios";

export default function receiveInitialData() {
    return (dispatch) => {
        return axios.get(API_ENDPOINT.READABLE_STARTER + '/posts', { headers: { "Authorization": 'whatever' } })
            .then((res) => {
                dispatch(ActionCreator.initialData(res.data));
            })
            .catch((err) => {
                console.error("error on getting the data " + err)
                dispatch(ActionCreator.initialData([]));
            })
    }
}