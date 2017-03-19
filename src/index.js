// @ flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './apiKey';

import makeStore from './stores/configure-store';
import App from './containers/App';
import AdminContainer from './containers/AdminContainer';
import ContactCardContainer from './containers/ContactCardContainer';
import SearchableContactListContainer from './containers/SearchableContactListContainer';
import './index.css';

const store = makeStore();
const history = syncHistoryWithStore(browserHistory, store);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  (<Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={SearchableContactListContainer} />
          <Route path="contact">
            {/*  Contact/ is an alias for Home... */}
            <IndexRoute component={SearchableContactListContainer} />
            <Route path="*" component={ContactCardContainer} />
          </Route>
          <Route path="admin" component={AdminContainer} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>),
  document.getElementById('root')
);
