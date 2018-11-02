import { combineReducers } from 'redux';

import commmet from './comment';
import loading from './loading';
import post from './post';

export default combineReducers({
    //commmet,
    loading,
    post
})