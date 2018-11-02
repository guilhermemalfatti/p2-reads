import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = {
  posts: []
}

const addPost = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    posts: [...state.posts, action.post]
  }
}

const initialdata = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    posts: action.posts
  }
}

const HANDLERS = {
  [Types.ADD_POST]: addPost,
  [Types.INITIAL_DATA]: initialdata
}

export default createReducer(INITIAL_STATE, HANDLERS)
