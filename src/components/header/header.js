import React, { Component } from 'react';
import './index.css';

class Header extends Component {

    render() {
        return (
            <div id="categories-list" class="carousel slide" data-ride="carousel">

                <div class="carousel-wrapper">
                    <h2>Categories</h2>
                    <ol class="carousel-indicators">
                        <span >Tiger</span>
                        <span  class="active">Balloon</span>
                        <span  >Tree</span>
                    </ol>
                </div>

            </div>
        )
    }
}

export default Header
