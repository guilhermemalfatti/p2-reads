import React, { Component } from 'react';
import './index.css';
import getCategories from '../../actions/categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ActionCreator from '../../actions/actionCreators';
import receiveInitialData from '../../actions/shared';

class Header extends Component {

    componentDidMount() {
        const { dispatch, originalPosts } = this.props
        const { category } = this.props.match.params;

        //in order to request initial data, only in the first time.
        if(originalPosts.length === 0){
            dispatch(receiveInitialData(category));
        }

        dispatch(getCategories());
    }

    filter = (category) =>{
        let { originalPosts } = this.props;
        let filteredPosts;
        const { dispatch } = this.props
        if(category === 'all' || !category){
            dispatch(ActionCreator.updateList(originalPosts));
        }else{
            filteredPosts = originalPosts.filter((item)=> item.category === category);
            dispatch(ActionCreator.updateList(filteredPosts));
        }
        dispatch(ActionCreator.selectCategory(category));
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
                                <span onClick={()=>{this.filter('all')}}> All </span>
                            </Link>
                        }
                        {categories && categories.map((cat) => (

                            category === cat.path ?
                                <Link key={cat.path} to={'/'.concat(cat.path)} >
                                    <span className="active" onClick={()=>{this.filter(cat.path)}}> {cat.name} </span>
                                </Link>
                                :
                                <Link key={cat.path} to={'/'.concat(cat.path)} >
                                    <span onClick={()=>{this.filter(cat.path)}}> {cat.name} </span>
                                </Link>

                        ))}
                    </ol>
                </div>

            </div>
        )
    }
}

export default connect((state) => ({
    categories: state.categories.items,
    originalPosts: state.posts.originalList
}))(Header)
