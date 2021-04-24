import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  LOGOUT, GET_ACCOUNTS_API, GET_LOGIN_TOKEN, GET_NEW_TOKEN
} from '../Constants/Auth';
import { setAuth, removeProfile, setProfile, setError, setToken } from '../Actions/Auth';
import { getAccountsApi, getLoginTokensApi, logoutUserApi, getNewTokenApi } from '../../Api';
import { removeContacts } from '../Actions/Contacts';

export function* getLoginAccounts() {
  try {
    const response = yield call(getAccountsApi);
    yield put(setAuth(response.data));
  } catch(error) {
    yield toast.error('get account api Fetch Error');
  }
}

export function* getLoginDetails(value) {
  try {
    const response = yield call(getLoginTokensApi, value );
    yield put(setProfile(response.data));
  } catch(error) {
    yield toast.error('Data Fetch Error');
    yield put(setError(error));
  }
}

export function* getNewToken(value) {
  try {
    const response = yield call(getNewTokenApi, value );
    yield put(setToken(response.data));
  } catch(error) {
    yield toast.error('Token Fetch Error');
    yield put(setError(error));
  }
}

export function* logoutApi(value) {
  try {
    const response = yield call(logoutUserApi, value );
    console.log('logout',response);
    yield put(removeProfile);
    yield put (removeContacts);
  } catch(error) {
    yield toast.error('Logout Error');
    yield put(setError(error));
  }
}

export function* watchLoginApi() {
  yield takeLatest(GET_ACCOUNTS_API, getLoginAccounts);
  yield takeLatest(GET_LOGIN_TOKEN, getLoginDetails);
  yield takeLatest(GET_NEW_TOKEN, getNewToken);
  yield takeLatest(LOGOUT, logoutApi);
}
