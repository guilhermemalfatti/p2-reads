import React, { Component } from 'react';
import './index.css';
import Modal from 'react-bootstrap/lib/Modal';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { withRouter } from 'react-router-dom'

class CreatePostBtn extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false,
      showAlert: false,
      title: '',
      body: '',
      author: '',
      category: ''
    };
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
    this.setState({ actegory: event.target.value });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  handleSubmit = (e) => {
    const { dispatch, history } = this.props;
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    dispatch(addPost(values, history));
  }

  render() {
    let { categories } = this.props;
    const { title, body, author, category } = this.state
    return (


      <React.Fragment>
        <button onClick={this.handleShow}>ADD</button>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              New post
                    </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} >
              <div className='create-contact-details'>
                <input type='text' name='title' placeholder='Title' value={title} onChange={(event)=>this.handleTitleChange(event)}/>
                <textarea type='text' name='body' placeholder='Body' value={body} onChange={(event)=>this.handleBodyChange(event)}/>
                <input className="author" type='text' name='author' placeholder='Author' value={author} onChange={(event)=>this.handleAuthorChange(event)}/>
                <select name="category" value={category} onChange={(event)=>this.handleCategoryChange(event)}>
                  <option>Category</option>
                  {categories && categories.map((cat) => (
                    <option value={cat.name}>{cat.name}</option>
                  ))}

                </select>
                <button type="submit">Add Post</button>&nbsp;
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
  categories: state.categories.items
}))(CreatePostBtn))
