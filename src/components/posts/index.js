import React, { Component } from 'react';
import './index.css';
import Loading from '../loading/index';
import List from '../list/index';
import { postVote } from '../../actions/post';
import { connect } from 'react-redux';
import ActionCreator from '../../actions/actionCreators';
import ModalPost from '../modalPost/index';
import { defineColor } from '../../util/index';
import PropTypes from 'prop-types';

class Posts extends Component {
    static propTypes = {
        post: PropTypes.object,
        isLoading: PropTypes.bool.isRequired
    }

    state = {
        sortByDesc: 'Sort by',
        searchValue: '',

    }

    selectFilter = (filter) => {
        this.setState(() => ({ sortByDesc: filter }));
        let { dispatch } = this.props;

        dispatch(ActionCreator.sortPost(filter));
    }

    voteItem = (postId, vote) => {
        let { dispatch } = this.props;
        dispatch(postVote(postId, vote));
    }

    filterList = (event) => {
        let { dispatch } = this.props;
        var updatedList = this.props.originalPosts;

        this.setState({
            searchValue: event.target.value
        });

        updatedList = updatedList.filter(function (item) {
            return item.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });

        dispatch(ActionCreator.updateList(updatedList));
    }

    resetFilter = () => {
        let { dispatch } = this.props;
        this.setState({
            searchValue: ''
        });

        dispatch(ActionCreator.updateList(this.props.originalPosts));
    }

    render() {
        const { sortByDesc } = this.state;
        let { posts, isLoading } = this.props;

        return (
            <div className="wrapper">
                <div id="container">
                    <div className="search-area">
                        <div className="input-wrapper">
                            <i className="fa fa-search"></i>
                            <input value={this.state.searchValue} type="text" onChange={this.filterList} placeholder="Have a question? Search for post by keywords" />
                        </div>
                        <button onClick={this.resetFilter}>Reset</button>
                        <ModalPost showModal={false}/>
                        <div className="dropdown">
                            <button className="dropbtn">{sortByDesc}<span className="caret"></span></button>
                            <div className="dropdown-content">
                                <a href="#" onClick={() => this.selectFilter('Date')}>Date</a>
                                <a href="#" onClick={() => this.selectFilter('Vote')}>Vote</a>
                            </div>
                        </div>
                    </div>

                    {isLoading === true ?
                        <Loading /> :
                        <List
                            items={posts}
                            type="post"
                            vote={this.voteItem}
                            color={defineColor}
                        />
                    }

                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    posts: state.posts.items,
    originalPosts: state.posts.originalList,
    isLoading: state.loading.isLoading
}))(Posts)
