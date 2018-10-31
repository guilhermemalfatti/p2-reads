import React, { Component } from 'react';
import './index.css';

class PostsList extends Component {

    render() {
        return (
            <div class="wrapper">
                <div id="container">
                    <div class="search-area">
                        <h1>Questions and Answers</h1>
                        <div class="input-wrapper">
                            <i class="fa fa-search"></i>
                            <input type="text" placeholder="Have a question? Search for answers with keywords" />
                        </div>
                        <button >Reset</button>
                        <button >ADD</button>

                    </div>


                    <div class="question" data-color="green">
                        <div class="votes">
                            <div class="upvote" ></div>
                            <div class="number-of-votes">55</div>
                            <div class="downvote" ></div>
                        </div>

                        <div class="question-and-answer">
                            <h2>What is your name?</h2>
                            <p>Guilherme Malfatti</p>
                        </div>
                    </div>
                    <div class="question" data-color="red">
                        <div class="votes">
                            <div class="upvote" ></div>
                            <div class="number-of-votes">-55</div>
                            <div class="downvote" ></div>
                        </div>

                        <div class="question-and-answer">
                            <h2>What is your name?</h2>
                            <p>Guilherme Malfatti</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostsList
