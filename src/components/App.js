import React, { Component } from 'react';
import Header from './header/index'
import Posts from './posts/index'
import PostsPage from './postPage/index'
import { Route } from 'react-router-dom';
import './index.css';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>

        <a href="http://github.com/guilhermemalfatti" className="float-github" target="_blank">
          <i className="fa fa-github"></i>
        </a>
        <a href="http://www.linkedin.com/in/guilherme-malfatti-b2683966" className="float-linkedin" target="_blank">
          <i className="fa fa-linkedin"></i>
        </a>
        <a href={process.env.PUBLIC_URL + '/'} className="float-home">
          <i className="fa fa-home"></i>
        </a>

        <Route path={process.env.PUBLIC_URL + '/:category'} component={Header} />
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Header} />

        <Route path={process.env.PUBLIC_URL + '/:category/:post_id'} component={PostsPage} />

        <Route exact path={process.env.PUBLIC_URL + '/'} component={Posts} />
        <Route exact path={process.env.PUBLIC_URL + '/:category'} component={Posts} />

      </div>

    );
  }
}

export default App;
