import React, { Component } from 'react';
import Header from './header/index'
import PostList from './postList/index'
import PostsPage from './postPage/index'
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Route exact path={process.env.PUBLIC_URL + '/post'} render={() => (
          <PostsPage/>
        )}
        />
        <Route exact path={process.env.PUBLIC_URL + '/'} render={() => (
          <PostList/>
        )}
        />

      </div>

    );
  }
}

export default App;
