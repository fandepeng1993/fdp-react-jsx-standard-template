import {all} from 'redux-saga/effects';
import userSaga from './user';
import settingsSaga from './settings';

const rootSagas = function *() {
    yield all([settingsSaga(),userSaga()]);
};
export default rootSagas;