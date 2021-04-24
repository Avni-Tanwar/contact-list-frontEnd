/* eslint-disable no-console */
import {
  SET_CONTACTS, SET_IS_LOADING, CLEAR_STORE
} from '../Constants/Contacts';

const initialState = {
  contacts: {},
};

const Contacts = (state = initialState.contacts, { type, value }) => {
  console.log('Type and value', type, value);
  switch (type) {
    case SET_CONTACTS:
      return { ...state, ...value };
    
    case SET_IS_LOADING:
      return { ...state, ...value }

    case CLEAR_STORE:
        return initialState.contacts;

    default:
      return state;
  }
};

export default Contacts;
