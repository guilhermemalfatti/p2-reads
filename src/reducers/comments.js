import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = {
    items: []
};

const getComments = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        items: action.comments
    }
}

const HANDLERS = {
    [Types.GET_COMMENTS]: getComments
}

export default createReducer(INITIAL_STATE, HANDLERS)
