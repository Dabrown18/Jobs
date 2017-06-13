import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import newsFeedReducer from './reducers/newsFeedReducer';
import searchTermReducers from './reducers/searchTermReducers';

const logger = createLogger();

export default (initialState = {}) => (
  createStore()
    combineReducers({
      news: newsFeedReducer,
      searchTerm: searchTermReducers
    }),
    initialState,
    applyMiddleware(logger)
  )
);
