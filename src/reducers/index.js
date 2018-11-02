import { combineReducers } from 'redux';

import commmet from './comments';
import loading from './loading';
import posts from './posts';

export default combineReducers({
    //commmet,
    loading,
    posts
})