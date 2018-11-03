import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = [];

const addPost = (state = INITIAL_STATE, action) => {
  return [...state.posts, action.post]
}

const initialdata = (state = INITIAL_STATE, action) => {
  return action.posts;
}

const downVote = (state = INITIAL_STATE, action) => {
  return state.map((item) => {
    if (item.id == action.postId) {
      item.voteScore -= 1;
    }
    return item;
  })
}
const upVote = (state = INITIAL_STATE, action) => {
  return state.map((item) => {
    if (item.id == action.postId) {
      item.voteScore += 1;
    }
    return item;
  })
}

const sortPost = (state = INITIAL_STATE, action) => {
  if (action.term === 'Date') {
    return [].concat(state).sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1;
      }
      if (a.timestamp > b.timestamp) {
        return -1;
      }
      return 0;
    });
  } else {
    return [].concat(state).sort((a, b) => {
      if (a.voteScore < b.voteScore) {
        return 1;
      }
      if (a.voteScore > b.voteScore) {
        return -1;
      }
      return 0;
    });
  }
}

const HANDLERS = {
  [Types.ADD_POST]: addPost,
  [Types.INITIAL_DATA]: initialdata,
  [Types.DOWN_VOTE]: downVote,
  [Types.UP_VOTE]: upVote,
  [Types.SORT_POST]: sortPost
}

export default createReducer(INITIAL_STATE, HANDLERS)
