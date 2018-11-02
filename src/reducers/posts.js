import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = [];

const addPost = (state = INITIAL_STATE, action) => {
  return [...state.posts, action.post]
}

const initialdata = (state = INITIAL_STATE, action) => {
  return action.posts;
}

const downVote = (state = INITIAL_STATE, action) =>{
  return state.map((item)=> {
      if(item.id == action.postId){
        item.voteScore -= 1;
      }
      return item;
    })
}

const HANDLERS = {
  [Types.ADD_POST]: addPost,
  [Types.INITIAL_DATA]: initialdata,
  [Types.DOWN_VOTE]: downVote,
}

export default createReducer(INITIAL_STATE, HANDLERS)
