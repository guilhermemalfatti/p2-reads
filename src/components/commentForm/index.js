import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { editComment, newComment } from '../../actions/comment';
import serializeForm from 'form-serialize';
import _ from 'lodash';
import PropTypes from 'prop-types';

const uuidv4 = require('uuid/v4');

class CommentForm extends Component {
    static propTypes = {
        comment: PropTypes.object,
        edititngComment: PropTypes.bool,
        selectedPost: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);

        this.state = {
            body: (props.comment && (props.comment.body || '')) || '',
            author: (props.comment && (props.comment.author || '')) || ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            body: (props.comment && (props.comment.body || '')) || '',
            author: (props.comment && (props.comment.author || '')) || ''
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
        const { dispatch, edititngComment, comment, selectedPost } = this.props;
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        values['timestamp'] = new Date().getTime();

        if (edititngComment) {
            dispatch(editComment(comment.id, values));
        } else {
            values['id'] = uuidv4();
            values['parentId'] = selectedPost.id;
            dispatch(newComment(values));
        }

        this.clearForm();
    }

    clearForm() {
        let { cancelCommentEdit } = this.props;

        this.setState({
            body: '',
            author: ''
        });

        cancelCommentEdit();
    }

    render() {
        let { edititngComment } = this.props;
        let { body, author } = this.state;
        const disabled = _.isEmpty(body) || _.isEmpty(author);
        return (
            <div id="comment-form" >
                <form onSubmit={this.handleSubmit} >
                    <div className='create-comment'>
                        <textarea type='text' name='body' placeholder='Comment body' value={body} onChange={(event) => this.handleBodyChange(event)} />
                        <input className="author" disabled={edititngComment} type='text' name='author' placeholder='Author' value={author} onChange={(event) => this.handleAuthorChange(event)} />
                        <br />
                        <button type="submit" disabled={disabled}>Submit comment</button>&nbsp;
                        <button type="button" onClick={this.clearForm}>Cancel</button>
                    </div>
                </form>


            </div>
        )
    }
}

export default connect((state) => ({
    selectedPost: state.posts.selectedPost || {}
}))(CommentForm)
