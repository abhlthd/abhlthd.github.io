import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'
import App from './containers/App';
import rootSaga from './sagas';
import rootReducer from './reducers';
import Profile from './containers/Profile';
import EditProfile from './containers/EditProfile';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
const history = syncHistoryWithStore(hashHistory, store);

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/profile/:user_id/edit" component={EditProfile}/>
      <Route path="/profile/:user_id" component={Profile}/>
    </Router>
  </Provider>,
  document.querySelector('.container')
);
