import React, { Component } from 'react';
import './index.css';
import getCategories from '../../actions/categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ActionCreator from '../../actions/actionCreators';
import { editComment } from '../../actions/comment';
import serializeForm from 'form-serialize';

class CommentForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            body: props.comment && props.comment.body || '',
            author: props.comment && props.comment.author || ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            body: props.comment && props.comment.body || '',
            author: props.comment && props.comment.author || ''
        });
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

    handleSubmit(e) {
        const { dispatch, edititngComment, comment } = this.props;
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        values['timestamp'] = new Date().getTime();

        if (edititngComment) {
            dispatch(editComment(comment.id, values));
        } else {
            //dispatch(addPost(values, history));
            alert('new');
        }
    }

    render() {
        let { cancelCommentEdit, edititngComment } = this.props;
        let { body, author } = this.state;
        return (
            <div id="comment-form" >
                <form onSubmit={this.handleSubmit} >
                    <div className='create-comment'>
                        <textarea type='text' name='body' placeholder='Comment body' value={body} onChange={(event) => this.handleBodyChange(event)} />
                        <input className="author" disabled={edititngComment} type='text' name='author' placeholder='Author' value={author} onChange={(event) => this.handleAuthorChange(event)} />
                        <br />
                        <button type="submit">Submit comment</button>&nbsp;
                        <button type="button" onClick={cancelCommentEdit}>Cancel</button>
                    </div>
                </form>


            </div>
        )
    }
}

export default connect()(CommentForm)
