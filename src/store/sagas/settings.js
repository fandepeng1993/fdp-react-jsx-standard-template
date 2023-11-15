import {
    call, put, takeLatest
} from 'redux-saga/effects';
import {SETTINGS} from '../actions';
import i18next from "i18next";

const changeLanguage = async function (lang) {
    return new Promise((resolve) => {
        i18next.changeLanguage(lang, (err) => {
            if (err) return resolve({err});
            return resolve({data: lang})
        });
    })
};


function* changeLang({payload}) {
    const {data, err} = yield call(changeLanguage, payload);
    if (!err) yield put({type: SETTINGS.UPDATELANGUAGE, payload: data})
}

function* settingsSaga() {
    yield takeLatest(SETTINGS.CHANGELANGUAGE, changeLang);

}

export default settingsSaga;

