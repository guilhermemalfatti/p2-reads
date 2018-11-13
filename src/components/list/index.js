import React from 'react';
import './index.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import style from './voteStyle.css';

let postDate = (timestamp) => {
    return moment(timestamp).format('DD/MM/YY HH:mm:ss');
}

export default function List(props) {
    if (props.type === "post") {
        return (
            <React.Fragment>
                {props.items && props.items.map((post) => (
                    <div key={post.id} className="question" data-color={props.color(post.voteScore)}>
                        <div className="votes">
                            <div className="upvote" onClick={() => props.vote(post.id, 'upVote')}></div>
                            <div className="number-of-votes">{post.voteScore}</div>
                            <div className="downvote" onClick={() => props.vote(post.id, 'downVote')}></div>
                        </div>

                        <div className="question-and-answer">
                            <Link to={process.env.PUBLIC_URL + '/' + post.category + '/' + post.id} >
                                <h2>{post.title}</h2>
                            </Link>

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
    } else {
        return (
            <React.Fragment>
                {props.items && props.items.map((item, index) => (
                    <li key={index}>
                         <div className={`user-comment ${item.voteScore > 2 ? style.green : item.voteScore >= 0 && item.voteScore <= 2 ? style.yellow : style.red}`}>
                            <div className="comment-votes">
                                <div className="upvote" onClick={() => props.vote(item.id, 'upVote')}></div>
                                <div className="number-of-votes">{item.voteScore}</div>
                                <div className="downvote" onClick={() => props.vote(item.id, 'downVote')}></div>
                            </div>
                            <img src={"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-32.png"} alt="" />
                            <header><a href="#" className="name">{item.author}</a><span>{postDate(item.timestamp)}</span></header>
                            <div className="content">
                                <p>{item.body}</p>
                            </div>
                            <a className="edit" onClick={() => { props.editComment(item) }}>edit</a>
                            <a className="delete" onClick={() => { props.onDeleteComment(item) }}>delete</a>
                        </div>
                    </li>
                ))}

                {props.items.length === 0 &&
                    <p>There is not comments, be the first to comment.</p>
                }
            </React.Fragment>
        )
    }

}