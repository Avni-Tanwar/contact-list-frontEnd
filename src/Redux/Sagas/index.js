import { all, fork } from 'redux-saga/effects';
import { watchLoginApi } from './Auth';
import { watchContactsApi } from './Contacts';

export default function* RootSaga() {
  yield all([fork(watchLoginApi)]);
  yield all([fork(watchContactsApi)]);
}
