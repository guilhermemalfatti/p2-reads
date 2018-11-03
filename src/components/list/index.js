import React from 'react';
import './index.css';
import moment from 'moment'

let postDate = (timestamp) => {
    return moment(timestamp).format('YY/MM/DD HH:mm:ss');
}

export default function List(props) {
    return (
        <React.Fragment>
            {props.items.map((post) => (
                <div className="question" data-color={props.color(post.voteScore)}>
                    <div className="votes">
                        <div className="upvote" onClick={() => props.vote(post.id, 'upVote')}></div>
                        <div className="number-of-votes">{post.voteScore}</div>
                        <div className="downvote" onClick={() => props.vote(post.id, 'downVote')}></div>
                    </div>

                    <div className="question-and-answer">
                        <a href="#">
                            <h2>{post.title}</h2>
                        </a>

                        <p className="author">{post.author} - {postDate(post.timestamp)}</p>
                        <p>{post.body}</p>
                    </div>
                    <div className="social">
                        <div className="post-comments">{post.commentCount}</div>
                    </div>
                </div>
            ))}
        </React.Fragment>
    )
}