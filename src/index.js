// @ flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import './apiKey';

import makeStore from './stores/configure-store';
import App from './containers/App';
import ContactCardContainer from './containers/ContactCardContainer';
import AdminContainer from './containers/AdminContainer';
import './index.css';

const store = makeStore();
const history = syncHistoryWithStore(browserHistory, store);

debugger;
ReactDOM.render(
  (<Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="contact/*" component={ContactCardContainer} />
        <Route path="admin" component={AdminContainer} />
      </Route>
    </Router>
  </Provider>),
  document.getElementById('root')
);
