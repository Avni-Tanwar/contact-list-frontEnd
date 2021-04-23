/* eslint-disable no-unused-vars */
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  LOGOUT, GET_ACCOUNTS_API, GET_LOGIN_TOKEN,
} from '../Constants/Auth';
import { setAuth, removeProfile, setProfile } from '../Actions/Auth';
import { getAccountsApi, getLoginTokensApi, logoutUserApi } from '../../Api';

export function* getLoginAccounts() {
  const response = yield call(getAccountsApi);
  console.log('response');
  yield put(setAuth(response.data));
}

export function* getLoginDetails(value) {
  try {
    const response = yield call(getLoginTokensApi(value));
    console.log('response',response);
    yield put(setProfile(response));
  } catch(error) {
    console.log('error');
    yield toast.error('Data Fetch Error');
  }
}

export function* logoutApi() {
  const response = yield call(logoutUserApi);
  yield put(removeProfile);
}

export function* watchLoginApi() {
  yield takeLatest(GET_ACCOUNTS_API, getLoginAccounts);
  yield takeLatest(GET_LOGIN_TOKEN, getLoginDetails);
  yield takeLatest(LOGOUT, logoutApi);
}
