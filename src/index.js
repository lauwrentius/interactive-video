import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'


import './index.css';
import App from './App';

// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

import reducer from './reducers'

const logger = store => next => action => {
  // console.group(action.type)
  // console.info('dispatching', action)
  // let result = next(action)
  // console.log('next state', store.getState())
  // console.groupEnd(action.type)
  return next(action)
}

const history = createHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware, logger)
  )
)

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'));

// registerServiceWorker();
unregister();
