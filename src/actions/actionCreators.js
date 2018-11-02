import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  addPost: ['post'],
  editPost: ['postId'],
  deletePost: ['postId'],

  addCommet: ['commet'],
  editCommet: ['commetId'],
  deleteCommmet: ['commetId'],

  initialData: ['posts']
})
export default Creators
