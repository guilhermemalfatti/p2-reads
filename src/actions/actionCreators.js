import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  addPost: ['post'],
  editPost: ['values', 'id'],
  deletePost: ['postId'],
  upVote: ['postId'],
  downVote: ['postId'],
  voteSelectedPost: ['vote'],
  selectPost: ['postId'],

  addComment: ['comment'],
  editComment: ['comment'],
  deleteComment: ['commentId'],

  initialData: ['posts', 'filter'],
  requestData: null,
  dataReceived: null,

  receiveCategories: ['categories'],
  selectCategory: ['category'],

  sortPost: ['term'],

  updateList: ['posts']
})
export default Creators
