import {
  GET_ACCOUNTS_API, LOGOUT, GET_LOGIN_TOKEN, SET_ACCOUNTS, LOGIN_SUCCESS, LOGIN_FAIL, GET_NEW_TOKEN, SET_REFRESH_TOKEN
} from '../Constants/Auth';

export const getLoginTokens = (value) => ({
  type: GET_LOGIN_TOKEN,
  value
});

export const getAccounts = () => ({
  type: GET_ACCOUNTS_API,
});

export const getNewToken = (value) => ({
  type: GET_NEW_TOKEN,
  value
});

export const setAccounts = (value) => ({
  type: SET_ACCOUNTS,
  value,
});

export const setProfile = (value) => ({
  type: LOGIN_SUCCESS,
  value,
});

export const setToken = (value) => ({
  type: SET_REFRESH_TOKEN,
  value,
});

export const setError = (value) => ({
  type: LOGIN_FAIL,
  value,
});

export const removeProfile = () => ({
  type: LOGOUT,
});
