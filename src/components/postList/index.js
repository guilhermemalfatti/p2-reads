import React, { Component } from 'react';
import './index.css';
import Loading from '../loading/index'
import Post from '../post/index';
import receiveInitialData from '../../actions/shared'

import { connect } from 'react-redux';

class PostList extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(receiveInitialData());
    }

    render() {

        let { post, isLoading } = this.props

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

                    {isLoading == true ?
                        <Loading /> :
                        post.posts.map((item) => (
                            <Post postItem={item} />
                        ))
                    }

                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    post: state.post,
    isLoading: state.loading.isLoading
}))(PostList)
