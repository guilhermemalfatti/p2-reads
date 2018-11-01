import React, { Component } from 'react';
import './index.css';

class PostsPage extends Component {

    render() {
        return (
            <div className="container">
            <div>
                <div id="post">
                    <header>
                        <img src={"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-64.png"}/>
                        <p><a href="#" className="name">Daniel Svensson</a> uploaded a new photo to the album <a href="#">Beautiful
                                Nature</a>.<span>20.04.2015 @ 12:00 PM</span></p>
                        <div className="option">
                                <ul>
                                    <li><a href="#edit">Edit</a></li>
                                    <li><a href="#delete">Delete</a></li>
                                </ul>
                        </div>
                    </header>

                    <div className="content">
                        <p>Nautre’s beauty can’t be described in words.</p>
                        <p>Nautre’s beauty can’t be described in words.</p>
                        <p>Nautre’s beauty can’t be described in words.</p>
                        <p>Nautre’s beauty can’t be described in words.</p>
                        <p>Nautre’s beauty can’t be described in words.</p>
                        <div id="social">
                            <div className="post-comments">402</div>
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
                                    <img src={"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-32.png"}/>
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
                                    <img src={"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-32.png"}/>
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

export default PostsPage
