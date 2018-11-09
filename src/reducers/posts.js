import { createReducer } from 'reduxsauce'
import { Types } from '../actions/actionCreators'

const INITIAL_STATE = {
  items: [],
  originalList: [],
  selectedPost: null
};

const addPost = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    items: state.items.concat(action.post),
    originalList: state.originalList.concat(action.post)
  }
}

const initialdata = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    items: action.filter ? action.posts.filter((item) => item.category === action.filter) : action.posts,
    originalList: action.posts
  }
}

const downVote = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    items: state.items.map((item) => {
      if (item.id === action.postId) {
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
      if (item.id === action.postId) {
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

const selectPost = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    selectedPost: state.items.filter((item) => {
      return item.id === action.postId
    })[0]
  }
}

const voteSelectedPost = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    selectedPost: {
      ...state.selectedPost,
      voteScore: action.vote === 'upVote' ? state.selectedPost.voteScore + 1 : state.selectedPost.voteScore - 1
    }
  }
}

const deletePost = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    items: state.items.filter((item) => item.id !== action.postId),
    originalList: state.originalList.filter((item) => item.id !== action.postId),
    selectedPost: null
  }
}

const HANDLERS = {
  [Types.ADD_POST]: addPost,
  [Types.INITIAL_DATA]: initialdata,
  [Types.DOWN_VOTE]: downVote,
  [Types.UP_VOTE]: upVote,
  [Types.SORT_POST]: sortPost,
  [Types.UPDATE_LIST]: updateList,
  [Types.SELECT_POST]: selectPost,
  [Types.VOTE_SELECTED_POST]: voteSelectedPost,
  [Types.DELETE_POST]: deletePost
}

export default createReducer(INITIAL_STATE, HANDLERS)
