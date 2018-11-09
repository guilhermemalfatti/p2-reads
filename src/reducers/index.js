import { combineReducers } from 'redux';

import comment from './comments';
import loading from './loading';
import categories from './categories';
import posts from './posts';

export default combineReducers({
    categories,
    //comment,
    loading,
    posts
})