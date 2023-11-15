import Cookies from 'js-cookie';

const TokenKey = 'authorization';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token, params) {
    return Cookies.set(TokenKey, token, {...params});
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}


const SMSCODE = 'SmsCode';

export function getSmsCode() {
    return Cookies.get(SMSCODE);
}

export function setSmsCode(token, params) {
    return Cookies.set(SMSCODE, token, {...params});
}

export function removeSmsCode() {
    return Cookies.remove(SMSCODE);
}