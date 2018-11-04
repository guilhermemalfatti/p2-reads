import React, { Component } from 'react';
import './index.css';
import Modal from 'react-bootstrap/lib/Modal';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import {withRouter } from 'react-router-dom'

class CreatePostBtn extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false,
            showAlert: false
        };
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
                                <input type='text' name='title' placeholder='Title' />
                                <textarea type='text' name='body' placeholder='Body' />
                                <input className="author" type='text' name='author' placeholder='Author' />
                                <select name="category">
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
