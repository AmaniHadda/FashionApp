import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';

import   './i18n'
import store from "./redux/store";
import { Suspense } from "react";
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

    <Suspense  fallback="loading">
    <App />
    </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
