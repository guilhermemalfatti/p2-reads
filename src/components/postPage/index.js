import React, { Component } from 'react';
import './index.css';
import style from './voteStyle.css';
import { selectPost, deletePost } from '../../actions/post';
import { getComments, deleteComment, commentVote } from '../../actions/comment';
import { connect } from 'react-redux';
import ActionCreator from '../../actions/actionCreators';
import Loading from '../loading/index';
import moment from 'moment';
import { postVote } from '../../actions/post';
import ModalPost from '../modalPost/index';
import CommentForm from '../commentForm/index';
import List from '../list/index';
import { defineColor } from '../../util/index';
import PropTypes from 'prop-types';

class PostsPage extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        comments: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            hideComment: false,
            labelHideComment: 'Hide Comments',
            commentBeingEdited: {},
            edititngComment: false
        };

        this.toggleComments = this.toggleComments.bind(this);
        this.setEditComment = this.setEditComment.bind(this);
        this.commentVote = this.commentVote.bind(this);
    }

    componentDidMount() {
        const { post_id } = this.props.match.params
        const { dispatch } = this.props

        dispatch(selectPost(post_id));
        dispatch(getComments(post_id));
    }

    toggleComments() {
        this.setState((state) => ({
            hideComment: !state.hideComment,
            labelHideComment: !state.hideComment === true ? "Show Comments" : "Hide Comments"
        }))
    }

    vote = (postId, vote) => {
        let { dispatch } = this.props;
        dispatch(postVote(postId, vote));
        dispatch(ActionCreator.voteSelectedPost(vote));
    }

    /**
     * @description Handle the comment vote (upvote and downvote)
     * @param {object} postId - The comment id
     * @param {object} vote - The vote
     */
    commentVote(commentId, vote) {
        let { dispatch } = this.props;

        dispatch(commentVote(commentId, vote));
    }

    postDate = (timestamp) => {
        return moment(timestamp).format('YY/MM/DD HH:mm:ss');
    }

    deletePost = (id) => {
        const { dispatch } = this.props

        //api call
        dispatch(deletePost(id));
    }

    editPost = () => {
        this.setState({
            editing: true
        });

    }

    cancelEdit = () => {
        this.setState({
            editing: false
        });
    }

    setEditComment = (comment) => {
        this.setState({
            commentBeingEdited: comment,
            edititngComment: true
        })
    }

    cancelCommentEdit = () => {
        this.setState({
            commentBeingEdited: null,
            edititngComment: false
        })
    }

    deleteComment = (comment) => {
        const { dispatch } = this.props

        //api call
        dispatch(deleteComment(comment));
    }

    render() {
        let { isLoading, post, comments } = this.props;
        let { hideComment, labelHideComment, commentBeingEdited, edititngComment } = this.state;

        if (this.state.editing) {

            return (
                <ModalPost post={post} showModal={true} editing={true} cancelEdit={this.cancelEdit} />
            )
        }

        if (!post.id && !isLoading) {
            return (
                <div className="not-found">
                    <h1>404</h1>
                    <h2>Item Not Found</h2>

                    <p>Sorry, I couldn't find the post you were looking for.</p>

                </div>
            )
        }

        return (
            isLoading === true ?
                <Loading />
                :
                <div className="container">
                    <div>
                        <div id="post" className={post.voteScore > 2 ? style.green : post.voteScore >= 0 && post.voteScore <= 2 ? style.yellow : style.red}>
                            <div className="votes">
                                <div className="upvote" onClick={() => this.vote(post.id, 'upVote')}></div>
                                <div className="number-of-votes">{post.voteScore}</div>
                                <div className="downvote" onClick={() => this.vote(post.id, 'downVote')}></div>
                            </div>
                            <header>
                                <h2>{post.title}</h2>
                                <img src={"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-64.png"} alt="" />
                                <p>
                                    <a href="#" className="name">{post.author}</a>
                                    &nbsp;wrote a post to the category
                                    &nbsp;<a href="#">{post.category}</a>.
                                    <span>{this.postDate(post.timestamp)}</span>
                                </p>
                                <div className="option">
                                    <ul>
                                        <li key="edit" onClick={() => { this.editPost() }}><a href="#edit">Edit</a></li>
                                        <li key="delete" onClick={() => this.deletePost(post.id)}><a href="#delete" >Delete</a></li>
                                    </ul>
                                </div>
                            </header>

                            <div className="content">
                                <p>{post.body}</p>
                                <div id="social">
                                    <div className="post-comments">{post.commentCount}</div>
                                </div>
                            </div>

                            <div className="hide-comments">
                                <input type="checkbox" value="" id="hide-button" name="check" />
                                <label className="button" onClick={this.toggleComments}>{labelHideComment}</label>
                            </div>

                            <div className="comments">
                                <CommentForm
                                    comment={commentBeingEdited}
                                    edititngComment={edititngComment}
                                    cancelCommentEdit={this.cancelCommentEdit} />
                                <ul>
                                    {!hideComment &&
                                        <List
                                            items={comments}
                                            type="comment"
                                            vote={this.commentVote}
                                            color={defineColor}
                                            editComment={this.setEditComment}
                                            onDeleteComment={this.deleteComment}
                                        />
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

        )
    }
}
export default connect((state) => ({
    isLoading: state.loading.isLoading,
    post: state.posts.selectedPost || {},
    comments: state.comment.items || []
}))(PostsPage)
