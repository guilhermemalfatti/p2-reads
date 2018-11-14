import React, { Component } from 'react';
import './index.css';
import Modal from 'react-bootstrap/lib/Modal';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { addPost, editPost } from '../../actions/post';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

class ModalPost extends Component {
  static propTypes = {
    post: PropTypes.object,
    showModal: PropTypes.bool,
    categorie: PropTypes.array,
    editing: PropTypes.bool,
    selectedPost: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false,
      showAlert: false,
      title: (props.post && (props.post.title || '')) || '',
      body: (props.post && (props.post.body || '')) || '',
      author: (props.post && (props.post.author || '')) || '',
      category: (props.post && (props.post.category || '')) || ''
    };
  }

  componentDidMount() {
    var { showModal } = this.props;
    if (showModal) {
      this.handleShow();
    }
  }

  /**
   * @description Handle the Input component value change
   * @param {object} event - The event
   */
  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  /**
   * @description Handle the textarea component value change
   * @param {object} event - The event
   */
  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }
  /**
   * @description Handle the Input component value change
   * @param {object} event - The event
   */
  handleAuthorChange(event) {
    this.setState({ author: event.target.value });
  }
  /**
   * @description Handle the Select component value change
   * @param {object} event - The event
   */
  handleCategoryChange(event) {
    this.setState({ category: event.target.value });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    let { cancelEdit } = this.props;
    this.setState({ show: false });
    if (cancelEdit) {
      cancelEdit();
    }
  }

  handleSubmit = (e) => {
    const { dispatch, history, editing, selectedPost } = this.props;
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    if (editing) {
      dispatch(editPost(values, selectedPost.id, history));
      this.handleHide();
    } else {
      dispatch(addPost(values, history));
    }

  }

  render() {
    let { categories, editing } = this.props;
    const { title, body, author, category } = this.state
    const disabled = _.isEmpty(title) || _.isEmpty(category) || _.isEmpty(body) || _.isEmpty(author);
    return (


      <React.Fragment>
        {editing !== true && <button onClick={this.handleShow}>ADD</button>}
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              {editing === true ? 'Edit post' : 'New post'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} >
              <div className='create-contact-details'>
                <input type='text' name='title' placeholder='Title' value={title} onChange={(event) => this.handleTitleChange(event)} />
                <textarea type='text' name='body' placeholder='Body' value={body} onChange={(event) => this.handleBodyChange(event)} />
                <input className="author" disabled={editing} type='text' name='author' placeholder='Author' value={author} onChange={(event) => this.handleAuthorChange(event)} />
                <select disabled={editing} name="category" value={category} onChange={(event) => this.handleCategoryChange(event)}>
                  <option>Category</option>
                  {categories && categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}

                </select>
                <button type="submit" disabled={disabled}>Submit Post</button>&nbsp;
                <button type="reset" onClick={this.handleHide}>Cancel</button>
              </div>
            </form>


          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(connect((state) => ({
  categories: state.categories.items,
  selectedPost: state.posts.selectedPost || {}
}))(ModalPost))
