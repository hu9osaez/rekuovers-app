import { AsyncStorage } from 'react-native';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import actionBuffer from 'redux-action-buffer';

import { persistStore, autoRehydrate } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';

import Reactotron from 'reactotron-react-native';

import * as reducers from './reducers';

const middlewares = [thunk, actionBuffer(REHYDRATE)];

/*if (__DEV__) {
  middlewares.push(logger);
}*/

const store = Reactotron.createStore(
  combineReducers(reducers),
  compose(applyMiddleware(...middlewares), autoRehydrate()),
);

persistStore(store, { storage: AsyncStorage, whitelist: ['auth', 'token'] });

export default store;
