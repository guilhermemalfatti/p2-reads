import axios from "axios";
import ActionCreator from './actionCreators';
import token from '../config/config';
import { API_ENDPOINT } from '../config/config';

const options = { headers: { "Authorization": token } };


export default function getCategories(postId, vote) {
    return (dispatch) => {

        return axios.get(
            API_ENDPOINT.READABLE_STARTER + '/categories',
            options)
            .then((res)=>{
                dispatch(ActionCreator.receiveCategories(res.data.categories));
            })
            .catch((err) => alert('There was an error on getCategories, the data is inconsistent, refresh the page and try again' + err))
    }
}
