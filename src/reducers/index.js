import { combineReducers } from 'redux';

import commmet from './comments';
import loading from './loading';
import categories from './categories';
import posts from './posts';

export default combineReducers({
    categories,
    //commmet,
    loading,
    posts
})