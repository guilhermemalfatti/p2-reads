import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = {
    categories: [],
    selectedCategory: 'all'
};

const receivecategories = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        items: action.categories
    }
}

const HANDLERS = {
    [Types.RECEIVE_CATEGORIES]: receivecategories
}

export default createReducer(INITIAL_STATE, HANDLERS)
