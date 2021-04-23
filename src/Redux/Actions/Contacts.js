import { GET_CONTACTS, SET_CONTACTS, SET_IS_LOADING } from '../Constants/Contacts';

export const setContacts = (value) => ({
  type: SET_CONTACTS,
  value,
});

export const getContacts = (value) => ({
  type: GET_CONTACTS,
  value,
});

export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  value,
});
