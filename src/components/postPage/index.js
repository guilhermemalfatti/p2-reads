import React, { Component } from 'react';
import './index.css';
import style from './voteStyle.css';
import { selectPost, deletePost } from '../../actions/post';
import { connect } from 'react-redux';
import ActionCreator from '../../actions/actionCreators';
import Loading from '../loading/index';
import moment from 'moment';
import { postVote } from '../../actions/post';
import ModalPost from '../modalPost/index';

class PostsPage extends Component {
    state = {
        editing: false
    };

    componentDidMount() {
        const { post_id } = this.props.match.params
        const { dispatch } = this.props

        dispatch(ActionCreator.requestData());
        dispatch(ActionCreator.selectPost(post_id));
    }

    vote = (postId, vote) => {
        let { dispatch } = this.props;
        dispatch(postVote(postId, vote));
        dispatch(ActionCreator.voteSelectedPost(vote));
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

    render() {
        let { isLoading, post } = this.props;

        if (this.state.editing) {

            return (
                <ModalPost post={post} showModal={true} editing={true} cancelEdit={this.cancelEdit}/>
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
                                <img src={"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-64.png"} alt="" />
                                <p>
                                    <a href="#" className="name">{post.author }</a>
                                    &nbsp;wrote a post to the category
                                    &nbsp;<a href="#">{post.category}</a>.
                                    <span>{this.postDate(post.timestamp)}</span>
                                </p>
                                <div className="option">
                                    <ul>
                                        <li key="edit"  onClick={()=>{this.editPost()}}><a href="#edit">Edit</a></li>
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
                                <label className="button">Hide Comments</label>

                                <input type="checkbox" value="" id="new-comment" name="check" />
                                <label className="button">New Comment</label>
                            </div>

                            <div className="comments">
                                <ul>
                                    <li key="1">
                                        <div className="user-comment">
                                            <img src={"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-32.png"} alt="" />
                                            <header><a href="#" className="name">Josephine Bowler</a><span>20.02.2015 @ 09:01</span></header>
                                            <div className="content">
                                                <p>This picture is absolutely amazing! You are such a good photographer :)</p>
                                            </div>
                                            <a href="#" className="edit">edit</a>
                                            <a href="#" className="delete">delete</a>
                                        </div>
                                    </li>

                                    <li key="2">
                                        <div className="user-comment">
                                            <img src={"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-32.png"} alt="" />
                                            <header><a href="#" className="name">Jennifer Lee</a><span>21.02.2015 @ 14:00</span></header>
                                            <div className="content">
                                                <p>Wow!!! Cool shot, Daniel! You should post more often =)</p>
                                            </div>
                                            <a href="#" className="edit">Edit</a>
                                            <a href="#" className="delete">Delete</a>
                                        </div>
                                    </li>
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
    post: state.posts.selectedPost || {}
}))(PostsPage)
