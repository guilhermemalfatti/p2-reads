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
import defineColor from '../../util/index';
import PropTypes from 'prop-types';

class PostsPage extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        comments: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired
    }
    state = {
        editing: false,
        hideComment: false,
        labelHideComment: 'Hide Comments',
        commentBeingEdited: {},
        edititngComment: false
    };

    componentDidMount() {
        const { post_id } = this.props.match.params
        const { onSelectPost, onGetComments } = this.props

        onSelectPost(post_id);
        onGetComments(post_id);
    }

    /**
     * Method responsible for toggle the comments in a post
     */
    toggleComments = () => {
        this.setState((state) => ({
            hideComment: !state.hideComment,
            labelHideComment: !state.hideComment === true ? "Show Comments" : "Hide Comments"
        }))
    }

    /**
     * Method responsible for handle the a vote in a post
     */
    vote = (postId, vote) => {
        let { onVoteSelectedPost, onPostVote } = this.props;
        onPostVote(postId, vote);
        onVoteSelectedPost(vote);
    }

    /**
     * @description Handle the comment vote (upvote and downvote)
     * @param {object} postId - The comment id
     * @param {object} vote - The vote
     */
    commentVote = (commentId, vote) => {
        let { onCommentVote } = this.props;

        onCommentVote(commentId, vote);
    }

    /**
     * Method responsible for format a date
     * @param timestamp The date
     */
    postDate = (timestamp) => {
        return moment(timestamp).format('YY/MM/DD HH:mm:ss');
    }

    /**
     * Method responsible for delete a post
     */
    deletePost = (id) => {
        const { onDeletePost } = this.props

        //api call
        onDeletePost(id);
    }

    /**
     * Method responsible for edit a post
     */
    editPost = () => {
        this.setState({
            editing: true
        });

    }

    /**
     * Method responsible for cancel edition
     */
    cancelEdit = () => {
        this.setState({
            editing: false
        });
    }

    /**
     * Method responsible for set the state to editing
     */
    setEditComment = (comment) => {
        this.setState({
            commentBeingEdited: comment,
            edititngComment: true
        })
    }

    /**
     * Method responsible for set the state not editing
     */
    cancelCommentEdit = () => {
        this.setState({
            commentBeingEdited: null,
            edititngComment: false
        })
    }

    /**
     * Method responsible for delete a comment
     */
    deleteComment = (comment) => {
        const { onDeleteComment } = this.props

        //api call
        onDeleteComment(comment);
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

const mapDispatchToProps = dispatch => {
    return {
        onSelectPost: post_id => {
            dispatch(selectPost(post_id));

        },
        onGetComments: post_id => {
            dispatch(getComments(post_id));
        },
        onPostVote: (postId, vote) => {
            dispatch(postVote(postId, vote));
        },
        onVoteSelectedPost: vote => {
            dispatch(ActionCreator.voteSelectedPost(vote));
        },
        onCommentVote: (commentId, vote) => {
            dispatch(commentVote(commentId, vote));
        },
        onDeletePost: id => {
            dispatch(deletePost(id));
        },
        onDeleteComment: comment => {
            dispatch(deleteComment(comment));
        }
    }
}

export default connect((state) => ({
    isLoading: state.loading.isLoading,
    post: state.posts.selectedPost || {},
    comments: state.comment.items || []
}), mapDispatchToProps)(PostsPage)
