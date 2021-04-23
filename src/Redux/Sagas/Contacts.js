/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  GET_CONTACTS,
} from '../Constants/Contacts';
import { setContacts } from '../Actions/Contacts';
import { getContactsApi } from '../../Api';

export function* getContactsList() {
  try {
    console.log('inside contacts sagas');
    const response = yield call(getContactsApi);
    yield put(setContacts(response));
  } catch (error) {
    console.log('error');
    yield toast.error('Data Fetch Error');
  }
}

export function* watchContactsApi() {
  yield takeLatest(GET_CONTACTS, getContactsList);
}
