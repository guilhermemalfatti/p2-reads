import React, { Component } from 'react';
import './index.css';
import getCategories from '../../actions/categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ActionCreator from '../../actions/actionCreators';
import receiveInitialData from '../../actions/shared';
import PropTypes from 'prop-types';

class Header extends Component {
    static propTypes = {
        originalPosts: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired
    }

    componentDidMount() {
        const { onGetCategories, originalPosts, onReceiveInitialData } = this.props
        const { category } = this.props.match.params;

        //in order to request initial data, only in the first time.
        if (originalPosts.length === 0) {
            onReceiveInitialData(category);
        }

        onGetCategories();
    }

    filter = (category) => {
        let { originalPosts } = this.props;
        let filteredPosts;
        const { onUpdateList, onSelectCategory } = this.props
        if (category === 'all' || !category) {
            onUpdateList(originalPosts);
        } else {
            filteredPosts = originalPosts.filter((item) => item.category === category);
            onUpdateList(filteredPosts);
        }
        onSelectCategory(category);
    }

    render() {
        let { categories } = this.props;
        const { category } = this.props.match.params;
        return (
            <div id="categories-list" className="carousel slide" data-ride="carousel">

                <div className="carousel-wrapper">
                    <h2>Categories</h2>
                    <ol className="carousel-indicators">
                        {category === undefined ?
                            <span className="active"> All </span> :

                            <Link to="/" >
                                <span onClick={() => { this.filter('all') }}> All </span>
                            </Link>
                        }
                        {categories && categories.map((cat) => (

                            category === cat.path ?
                                <Link key={cat.path} to={`/${cat.path}`} >
                                    <span className="active" onClick={() => { this.filter(cat.path) }}> {cat.name} </span>
                                </Link>
                                :
                                <Link key={cat.path} to={`/${cat.path}`} >
                                    <span onClick={() => { this.filter(cat.path) }}> {cat.name} </span>
                                </Link>

                        ))}
                    </ol>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onReceiveInitialData: category => {
            dispatch(receiveInitialData(category))
        },
        onGetCategories: () => {
            dispatch(getCategories())
        },
        onUpdateList: posts => {
            dispatch(ActionCreator.updateList(posts));
        },
        onSelectCategory: category => {
            dispatch(ActionCreator.selectCategory(category));
        }
    }
}

export default connect((state) => ({
    categories: state.categories.items,
    originalPosts: state.posts.originalList
}), mapDispatchToProps)(Header)
