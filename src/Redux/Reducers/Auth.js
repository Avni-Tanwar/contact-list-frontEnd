/* eslint-disable no-console */
import {
  LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_STORE, SET_AUTH,
} from '../Constants/Auth';

const initialState = {
  Auth: {},
};

const Auth = (state = initialState.Auth, { type, value }) => {
  console.log('Type and value', type, value);
  switch (type) {
    case SET_AUTH:
      return value;

    case LOGIN_SUCCESS:
      return {...state, value};

    case LOGIN_FAIL:
      return 'Login failed';

    case LOGOUT:
    case CLEAR_STORE:
      return initialState.Auth;

    default:
      return state;
  }
};

export default Auth;
