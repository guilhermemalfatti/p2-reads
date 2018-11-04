import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Modal from 'react-bootstrap/lib/Modal';

class CreatePostBtn extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false
        };
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    render() {
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
                        <div class="form-group">
                            <div className='create-contact-details'>
                                <input type='text' name='title' placeholder='Title' />
                                <textarea type='text' name='body' placeholder='Body' />
                                <input className="author" type='text' name='author' placeholder='Author' />
                                <select>
                                    <option>Category</option>
                                    <option>d</option>
                                </select>
                                <button>Add Post</button>&nbsp;
                            <button>Cancel</button>
                            </div>

                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

export default CreatePostBtn;
