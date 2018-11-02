import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import reducer from './reducers';
import middleware from './middleware';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer,
    composeEnhancers(
        middleware
    ))


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

//https://github.com/udacity/reactnd-redux-todos-goals/commit/1177c07de724399ba9f8b1573c4c9711caa23daa
