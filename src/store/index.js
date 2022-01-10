import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import rootSagas from './sagas';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  keyPrefix: '',
  key: 'zuler',
  storage,
  blacklist: ['_persist'],
  whitelist: []  // ['settings', 'userInfo']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();


export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);
export const persistor = persistStore(store);
