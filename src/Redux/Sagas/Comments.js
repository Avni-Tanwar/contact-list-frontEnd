import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { setComments, setIsLoading } from '../Actions/Comments';
import { getCommentsApi, createCommentsApi, deleteCommentsApi } from '../../Api';
import { GET_COMMENTS, CREATE_COMMENTS, DELETE_COMMENTS } from '../Constants/Comments';

export function* getComments(value) {
  yield put(setIsLoading(true));
  try {
    const response = yield call(getCommentsApi, value);
    console.log("GET_COMMENTS_API: ", response.data);
    yield put(setComments(response?.data));
  } catch (error) {
    console.log('error');
    yield toast.error('Contacts Fetch Error');
  }
  yield put(setIsLoading(false));
}

export function* createComments(value) {
  try {
    const response = yield call(createCommentsApi, value);
    console.log("CREATED_COMMENT_RESPONSE_DATA", response.data);
    const data = response.data.data;
    yield put(setComments({ data }));
  } catch (error) {
    console.log('error');
    yield toast.error('Contacts Create Error');
  }
}

export function* deleteComments(value) {
  try {
    const response = yield call(deleteCommentsApi, value);
    console.log("DELETE_COMMENT_RESPONSE_DATA", response.data);
  } catch (error) {
    console.log('error');
    yield toast.error('Contacts Delete Error');
  }
}

export function* watchCommentsApi() {
  yield takeLatest(GET_COMMENTS, getComments);
  yield takeLatest(CREATE_COMMENTS, createComments);
  yield takeLatest(DELETE_COMMENTS, deleteComments);
}
