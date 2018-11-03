import React, { Component } from 'react';
import './index.css';
import getCategories from '../../actions/categories';
import { connect } from 'react-redux';

class Header extends Component {

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(getCategories());
    }

    render() {
        let { categories } = this.props;
        const { category } = this.props.match.params
        return (
            <div id="categories-list" className="carousel slide" data-ride="carousel">

                <div className="carousel-wrapper">
                    <h2>Categories</h2>
                    <ol className="carousel-indicators">
                        {category == undefined ?
                            <span className="active"> All </span>:
                            <span > All </span>
                            }
                        {categories && categories.map((cat) => (

                            category === cat.path ?
                                <span className="active"> {cat.name} </span> :
                                <span > {cat.name} </span>
                        ))}
                    </ol>
                </div>

            </div>
        )
    }
}

export default connect((state) => ({
    categories: state.categories.items,
}))(Header)
