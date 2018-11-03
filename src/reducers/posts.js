import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = {
  items: [],
  originalList: [],
  selectedPost: null
};

const addPost = (state = INITIAL_STATE, action) => {
  //TODO: ajudt it, *originalList*
  return [...state.posts, action.post]
}

const initialdata = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    items: action.posts,
    originalList: action.posts
  }
}

const downVote = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    items: state.items.map((item) => {
      if (item.id == action.postId) {
        item.voteScore -= 1;
      }
      return item;
    })
  }
}

const upVote = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    items: state.items.map((item) => {
      if (item.id == action.postId) {
        item.voteScore += 1;
      }
      return item;
    })
  }
}

const sortPost = (state = INITIAL_STATE, action) => {
  if (action.term === 'Date') {
    return {
      ...state,
      items: [].concat(state.items).sort((a, b) => {
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        if (a.timestamp > b.timestamp) {
          return -1;
        }
        return 0;
      })
    }
  } else {
    return {
      ...state,
      items: [].concat(state.items).sort((a, b) => {
        if (a.voteScore < b.voteScore) {
          return 1;
        }
        if (a.voteScore > b.voteScore) {
          return -1;
        }
        return 0;
      })
    }
  }
}

const updateList = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    items: action.posts
  }
}

const getPost = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    selectedPost: action.post
  }
}

const HANDLERS = {
  [Types.ADD_POST]: addPost,
  [Types.INITIAL_DATA]: initialdata,
  [Types.DOWN_VOTE]: downVote,
  [Types.UP_VOTE]: upVote,
  [Types.SORT_POST]: sortPost,
  [Types.UPDATE_LIST]: updateList,
  [Types.GET_POST]: getPost
}

export default createReducer(INITIAL_STATE, HANDLERS)
