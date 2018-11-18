import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = {
    isLoading: true
}


/**
 * Method responsible for return the new state when loading is off
 * @param {*} state The current state
 * @param {*} action The action
 */
const loadingOff = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false
    }
}

/**
 * Method responsible for return the new state when loading is on
 * @param {*} state The current state
 * @param {*} action The action
 */
const loadingOn = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: true
    }
}

const HANDLERS = {
    [Types.INITIAL_DATA]: loadingOff,
    [Types.REQUEST_DATA]: loadingOn,
    [Types.SELECT_POST]: loadingOff,
    [Types.DATA_RECEIVED]: loadingOff

}

export default createReducer(INITIAL_STATE, HANDLERS)
