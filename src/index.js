// @ flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// You need your own google api key.
// set it to window.apiKey.
import './apiKey';

import makeStore from './stores/configure-store';
import ApplicationWrapper from './containers/ApplicationWrapper';
import AdminContainer from './containers/AdminContainer';
import ContactContainer from './containers/ContactContainer';
import './index.css';

const store = makeStore();
const history = syncHistoryWithStore(browserHistory, store);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// TODO: deal with the contact/* error routes
ReactDOM.render(
  (<Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        {/* Application Wrapper goes around the entire app, providing layout + data */}
        <Route path="/" component={ApplicationWrapper}>
          {/*  Contact/ is an alias for Home */}
          <IndexRoute component={ContactContainer} />
          <Route path="contact">
            <IndexRoute component={ContactContainer} />
            <Route path="*" component={ContactContainer} />
          </Route>
          <Route path="admin" component={AdminContainer} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>),
  document.getElementById('root')
);
