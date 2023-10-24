/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import rootReducer from "../reducers";
import { createStore, applyMiddleware, compose } from "redux";
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartRed']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};
const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
