import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { setComments, setIsLoading } from '../Actions/Comments';
import { getCommentsApi } from '../../Api';
import { GET_COMMENTS } from '../Constants/Comments';

export function* getComments(value) {
  yield put(setIsLoading(true));
  try {
    const response = yield call(getCommentsApi, value);
    yield put(setComments(response));
  } catch (error) {
    console.log('error');
    yield toast.error('Contacts Fetch Error');
  }
  yield put(setIsLoading(false));
}

export function* watchCommentsApi() {
  yield takeLatest(GET_COMMENTS, getComments);
}
