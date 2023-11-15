// import {createStore,applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import rootSagas from './sagas';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  keyPrefix: '',
  key: 'desktron',
  storage,
  blacklist: ['_persist'],
  whitelist: ['userInfo','settings']  // ['settings', 'userInfo']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

// export const store = createStore(persistedReducer,applyMiddleware(sagaMiddleware));
export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>(getDefaultMiddleware({serializableCheck:false}).concat(sagaMiddleware))
});
sagaMiddleware.run(rootSagas);
export const persistor = persistStore(store);
