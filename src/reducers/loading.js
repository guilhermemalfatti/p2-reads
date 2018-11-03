import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = {
    isLoading: true
}

const loadingOff = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false
    }
}

const loadingOn = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: true
    }
}

const HANDLERS = {
    [Types.INITIAL_DATA]: loadingOff,
    [Types.REQUEST_DATA]: loadingOn,
    [Types.DATA_RECEIVED]: loadingOff
}

export default createReducer(INITIAL_STATE, HANDLERS)
