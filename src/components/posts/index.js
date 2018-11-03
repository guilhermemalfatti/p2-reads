import React, { Component } from 'react';
import './index.css';
import Loading from '../loading/index';
import List from '../list/index';
import receiveInitialData from '../../actions/shared';
import { postVote } from '../../actions/post';
import { connect } from 'react-redux';
import ActionCreator from '../../actions/actionCreators';

class Posts extends Component {
    state = {
        sortByDesc: 'Sort by',
        searchValue: ''
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

    deleteitem = () => {

    }

    editItem = () => {

    }

    defineColor = (votes) => {
        if (votes > 2) {
            return 'green';
        } else if (votes >= 0 && votes <= 2) {
            return 'yellow';
        } else {
            return 'red';
        }
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

    resetFilter = () =>{
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
                        <button >ADD</button>
                        <div className="dropdown">
                            <button className="dropbtn">{sortByDesc}<span className="caret"></span></button>
                            <div className="dropdown-content">
                                <a href="#" onClick={() => this.selectFilter('Date')}>Date</a>
                                <a href="#" onClick={() => this.selectFilter('Vote')}>Vote</a>
                            </div>
                        </div>
                    </div>

                    {isLoading == true ?
                        <Loading /> :
                        <List
                            items={posts}
                            edit={this.editItem}
                            delete={this.deleteitem}
                            vote={this.voteItem}
                            color={this.defineColor}
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
