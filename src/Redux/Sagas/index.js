import { all, fork } from 'redux-saga/effects';
import { watchLoginApi } from './Auth';
import { watchContactsApi } from './Contacts';
import { watchCommentsApi } from './Comments';

export default function* RootSaga() {
  yield all([fork(watchLoginApi)]);
  yield all([fork(watchContactsApi)]);
  yield all([fork(watchCommentsApi)]);
}
