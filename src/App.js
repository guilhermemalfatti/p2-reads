import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header'
import PostsList from './components/postsList/postsList'
import PostsPage from './components/postPage/postPage'
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
          <PostsList/>
        )}
        />

      </div>

    );
  }
}

export default App;
