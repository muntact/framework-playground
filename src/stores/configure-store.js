import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerReducer } from 'react-router-redux';

import users from './users/reducer';


const makeStore = (initialState) => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const loggerMiddleware = createLogger();

  const rootReducer = combineReducers({
    users,
    routing: routerReducer,
  });

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      ),
    )
  );
};

export default makeStore;
