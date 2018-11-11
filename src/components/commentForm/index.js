import React, { Component } from 'react';
import './index.css';
import getCategories from '../../actions/categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ActionCreator from '../../actions/actionCreators';
import receiveInitialData from '../../actions/shared';

class CommentForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            body: props.post && props.post.body || '',
            author: props.post && props.post.author || ''
        };
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

    render() {
        //let { categories } = this.props;
        let { body, author } = this.state;
        return (
            <div id="comment-form" >
                <form onSubmit={this.handleSubmit} >
                    <div className='create-comment'>
                        <textarea type='text' name='body' placeholder='Comment body' value={body} onChange={(event) => this.handleBodyChange(event)} />
                        <input className="author" type='text' name='author' placeholder='Author' value={author} onChange={(event) => this.handleAuthorChange(event)} />

                        <button type="submit">Submit comment</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(CommentForm)
