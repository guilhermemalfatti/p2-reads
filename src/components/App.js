import React, { Component } from 'react';
import Header from './header/index'
import Posts from './posts/index'
import PostsPage from './postPage/index'
import { Route } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Route exact path={process.env.PUBLIC_URL + '/:category/:post_id'} component={PostsPage}/>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Posts}/>

      </div>

    );
  }
}

export default App;
