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

        <Link to="//github.com/guilhermemalfatti" className="float-github">
          <i class="fa fa-github"></i>
        </Link>
        <Link to="//www.linkedin.com/in/guilherme-malfatti-b2683966" className="float-linkedin">
          <i class="fa fa-linkedin"></i>
        </Link>
        <Link to={process.env.PUBLIC_URL + '/'} className="float-home">
          <i class="fa fa-home"></i>
        </Link>

        <Header />
        <Route exact path={process.env.PUBLIC_URL + '/:category/:post_id'} component={PostsPage} />
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Posts} />

      </div>

    );
  }
}

export default App;
