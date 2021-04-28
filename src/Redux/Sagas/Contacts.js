/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  GET_CONTACTS,
} from '../Constants/Contacts';
import { setContacts, setIsLoading } from '../Actions/Contacts';
import { getContactsApi } from '../../Api';

export function* getContactsList(value) {
  yield put(setIsLoading({ loading:true }));
  try {
    const response = yield call(getContactsApi, value);
    yield put(setContacts(response.data));
    console.log("CONTACTS",response);
  } catch (error) {
    console.log('error');
    yield toast.error('Contacts Fetch Error');
  }
  yield put(setIsLoading({ loading:false }));
}

export function* watchContactsApi() {
  yield takeLatest(GET_CONTACTS, getContactsList);
}
