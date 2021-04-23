import { GET_ACCOUNTS_API, LOGOUT, GET_LOGIN_TOKEN, SET_AUTH, LOGIN_SUCCESS } from '../Constants/Auth';

export const getLoginTokens = (value) => ({
  type: GET_LOGIN_TOKEN,
  value
});

export const setProfile = (value) => ({
  type: LOGIN_SUCCESS,
  value,
});

export const getAccounts = () => ({
  type: GET_ACCOUNTS_API,
});

export const setAuth = (value) => ({
  type: SET_AUTH,
  value,
});

export const removeProfile = () => ({
  type: LOGOUT,
});
