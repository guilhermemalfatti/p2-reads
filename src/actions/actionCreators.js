import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  addPost: ['post'],
  editPost: ['postId'],
  deletePost: ['postId'],
  upVote: ['postId'],
  downVote: ['postId'],

  addCommet: ['commet'],
  editCommet: ['commetId'],
  deleteCommmet: ['commetId'],

  initialData: ['posts'],

  receiveCategories: ['categories'],

  sortPost: ['term']
})
export default Creators
