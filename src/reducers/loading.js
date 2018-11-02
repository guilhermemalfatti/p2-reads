import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = {
    isLoading: true
}

const loading = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false
    }
}

const HANDLERS = {
    [Types.INITIAL_DATA]: loading
}

export default createReducer(INITIAL_STATE, HANDLERS)
