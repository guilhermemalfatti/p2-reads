import React, { Component } from 'react';
import './index.css';
import { handlePost } from '../../actions/post';

import { connect } from 'react-redux';

class Post extends Component {

    defineColor = (votes) => {
        if (votes > 2) {
            return 'green';
        } else if (votes > 0 && votes <= 2) {
            return 'yellow';
        } else {
            return 'red';
        }
    }

    render() {
        let { postItem } = this.props;
        return (
            <div class="question" data-color={this.defineColor(postItem.voteScore)}>
                <div class="votes">
                    <div class="upvote" ></div>
                    <div class="number-of-votes">{postItem.voteScore}</div>
                    <div class="downvote" ></div>
                </div>

                <div class="question-and-answer">
                    <a href="#">
                        <h2>{postItem.title}</h2>
                    </a>

                    <p>{postItem.body}</p>
                </div>
            </div>
        )
    }
}

export default connect()(Post)
