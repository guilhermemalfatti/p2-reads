import React, { Component } from 'react';
import './index.css';
import { postVote } from '../../actions/post';

import { connect } from 'react-redux';

class Post extends Component {

    defineColor = (votes) => {
        if (votes > 2) {
            return 'green';
        } else if (votes >= 0 && votes <= 2) {
            return 'yellow';
        } else {
            return 'red';
        }
    }

    vote = (postId, vote) => {
        let { dispatch } = this.props;
        dispatch(postVote(postId, vote));
    }

    render() {
        let { postItem, posts } = this.props;
        return (
            <div className="question" data-color={this.defineColor(postItem.voteScore)}>
                <div className="votes">
                    <div className="upvote" onClick={()=> this.vote(postItem.id, 'upVote')}></div>
                    <div className="number-of-votes">{postItem.voteScore}</div>
                    <div className="downvote" onClick={() => this.vote(postItem.id, 'downVote')}></div>
                </div>

                <div className="question-and-answer">
                    <a href="#">
                        <h2>{postItem.title}</h2>
                    </a>

                    <p>{postItem.body}</p>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    posts: state.posts
}))(Post)
