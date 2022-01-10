import {all} from 'redux-saga/effects';
import testuserSaga from './testuser'

const rootSagas = function *() {
    yield all([testuserSaga()]);
};
export default rootSagas;