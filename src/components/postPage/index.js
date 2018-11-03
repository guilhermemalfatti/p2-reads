import React, { Component } from 'react';
import './index.css';
import { getPost } from '../../actions/post';
import { connect } from 'react-redux';
import ActionCreator from '../../actions/actionCreators';
import Loading from '../loading/index';
import moment from 'moment';

class PostsPage extends Component {

    componentDidMount() {
        const { post_id } = this.props.match.params
        const { dispatch } = this.props

        dispatch(ActionCreator.requestData());
        dispatch(getPost(post_id));
    }

    postDate = (timestamp) => {
        return moment(timestamp).format('YY/MM/DD HH:mm:ss');
    }

    render() {
        let { isLoading, post } = this.props;
        return (
            isLoading == true ?
                <Loading />
                :
                <div className="container">
                    <div>
                        <div id="post">
                            <header>
                                <img src={"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-64.png"} alt="" />
                                <p><a className="name">{post.author}</a> wrote a post to the category <a >{post.category}</a>.<span>{this.postDate(post.timestamp)}</span></p>
                                <div className="option">
                                    <ul>
                                        <li><a href="#edit">Edit</a></li>
                                        <li><a href="#delete">Delete</a></li>
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
                                <input type="checkbox" value="" id="hide-button" name="check" checked />
                                <label for="hide-button" className="button">Hide Comments</label>

                                <input type="checkbox" value="" id="new-comment" name="check" checked />
                                <label for="new-comment" className="button">New Comment</label>
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
                                            <a href="" className="edit">edit</a>
                                            <a href="" className="delete">delete</a>
                                        </div>
                                    </li>



                                    <li key="2">
                                        <div className="user-comment">
                                            <img src={"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-32.png"} alt="" />
                                            <header><a href="#" className="name">Jennifer Lee</a><span>21.02.2015 @ 14:00</span></header>
                                            <div className="content">
                                                <p>Wow!!! Cool shot, Daniel! You should post more often =)</p>
                                            </div>
                                            <a href="" className="edit">Edit</a>
                                            <a href="" className="delete">Delete</a>
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
