import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  addPost: ['post'],
  editPost: ['values', 'id'],
  deletePost: ['postId'],
  upVote: ['postId'],
  downVote: ['postId'],
  voteSelectedPost: ['vote'],
  selectPost: ['post'],

  addComment: ['comment'],
  editComment: ['commentId', 'values'],
  deleteComment: ['comment'],
  getComments: ['comments'],

  initialData: ['posts', 'filter'],
  requestData: null,
  dataReceived: null,

  receiveCategories: ['categories'],
  selectCategory: ['category'],

  sortPost: ['term'],

  updateList: ['posts']
})
export default Creators
