import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = {
    items: [],
    selectedCategory: 'all'
};

const receivecategories = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        items: action.categories
    }
}


const selectCategory = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        selectedCategory: action.category
    }
}

const HANDLERS = {
    [Types.RECEIVE_CATEGORIES]: receivecategories,
    [Types.SELECT_CATEGORY]: selectCategory

}

export default createReducer(INITIAL_STATE, HANDLERS)
