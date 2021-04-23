/* eslint-disable no-console */
import {
  SET_CONTACTS,
} from '../Constants/Contacts';

const initialState = {
  contacts: {},
};

const Contacts = (state = initialState.contacts, { type, value }) => {
  console.log('Type and value', type, value);
  switch (type) {
    case SET_CONTACTS:
      return value;

    default:
      return state;
  }
};

export default Contacts;
