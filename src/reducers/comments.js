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

const addComment = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        items: state.items.concat(action.comment)
    }
}

const editComment = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        items: state.items.map((item)=>{
            if(item.id === action.commentId){
                item.body = action.values.body;
                item.timestamp = action.values.timestamp;
            }
            return item;
        })
    }
}


const HANDLERS = {
    [Types.GET_COMMENTS]: getComments,
    [Types.ADD_COMMENT]: addComment,
    [Types.EDIT_COMMENT]: editComment
}

export default createReducer(INITIAL_STATE, HANDLERS)
