import '@formatjs/intl-pluralrules/polyfill';
// import '@formatjs/intl-pluralrules/locale-data/en' // locale-data for en

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ErrorBoundary from '@/layout/ErrorBoundary';
import {PersistGate} from 'redux-persist/integration/react';
import '@/lang/index';
import {store, persistor} from '@/store';

import './index.less';
import App from './App';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <App/>
      </ErrorBoundary>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals