import React, { Component } from 'react';
import './index.css';
import Loading from '../loading/index';
import List from '../list/index';
import { postVote } from '../../actions/post';
import { connect } from 'react-redux';
import ActionCreator from '../../actions/actionCreators';
import ModalPost from '../modalPost/index';
import defineColor from '../../util/index';
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

    /**
     * Method responsible for select a filter to sort the posts
     */
    selectFilter = (filter) => {
        this.setState(() => ({ sortByDesc: filter }));
        let { onSortPost } = this.props;

        onSortPost(filter);
    }

    /**
     * Method responsible for add a vote in a post
     */
    voteItem = (postId, vote) => {
        let { onPostVote } = this.props;
        onPostVote(postId, vote);
    }

    /**
     * Method responsible for filter the posts
     */
    filterList = (event) => {
        let { onUpdateList } = this.props;
        var updatedList = this.props.originalPosts;

        this.setState({
            searchValue: event.target.value
        });

        updatedList = updatedList.filter(function (item) {
            return item.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });

        onUpdateList(updatedList);
    }

    /**
     * Method responsible for reset the filter
     */
    resetFilter = () => {
        let { onUpdateList } = this.props;
        this.setState({
            searchValue: ''
        });

        onUpdateList(this.props.originalPosts);
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
                        <ModalPost showModal={false} />
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


const mapDispatchToProps = dispatch => {
    return {
        onSortPost: filter => {
            dispatch(ActionCreator.sortPost(filter));
        },
        onPostVote: (postId, vote) => {
            dispatch(postVote(postId, vote));
        },
        onUpdateList: updatedList =>{
            dispatch(ActionCreator.updateList(updatedList));
        }

    }
}

export default connect((state) => ({
    posts: state.posts.items,
    originalPosts: state.posts.originalList,
    isLoading: state.loading.isLoading
}), mapDispatchToProps)(Posts)
