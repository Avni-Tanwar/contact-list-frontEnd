/* eslint-disable no-unused-vars */
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import MuiAlert from '@material-ui/lab/Alert';
import {
  LOGOUT, GET_ACCOUNTS_API, GET_LOGIN_TOKEN,
} from '../Constants/Auth';
import { setAuth, removeProfile, setProfile, setError, setToken } from '../Actions/Auth';
import { getAccountsApi, getLoginTokensApi, logoutUserApi, getNewTokensApi } from '../../Api';

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
    const response = yield call(getNewTokensApi, value );
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
  } catch(error) {
    <MuiAlert elevation={6} variant="filled" severity="error"> Error!!!!</MuiAlert>
    yield toast.error('Data Fetch Error');
    yield put(setError(error));
  }
}

export function* watchLoginApi() {
  yield takeLatest(GET_ACCOUNTS_API, getLoginAccounts);
  yield takeLatest(GET_LOGIN_TOKEN, getLoginDetails);
  yield takeLatest(LOGOUT, logoutApi);
}
