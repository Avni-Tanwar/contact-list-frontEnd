import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { setComments, setIsLoading, addComment } from '../Actions/Comments';
import { getCommentsApi, createCommentsApi, editCommentsApi, deleteCommentsApi } from '../../Api';
import { GET_COMMENTS, CREATE_COMMENTS, DELETE_COMMENTS, ADD_COMMENT, EDIT_COMMENTS } from '../Constants/Comments';

export function* getComments(value) {
  yield put(setIsLoading(true));
  try {
    const response = yield call(getCommentsApi, value);
    console.log("GET_COMMENTS_API: ", response.data);
    yield put(setComments(response?.data));
  } catch (error) {
    console.log('error');
    yield toast.error('Comments Fetch Error');
  }
  yield put(setIsLoading(false));
}

export function* createComments(value) {
  try {
    const response = yield call(createCommentsApi, value);
    console.log("CREATED_COMMENT_RESPONSE_DATA", response.data);
    // const data = response.data.data;
    // yield put(addComment({ ...data }));
  } catch (error) {
    console.log('error');
    yield toast.error('Comments Create Error');
  }
}

export function* editComments(value) {
  try {
    const response = yield call(editCommentsApi, value);
    console.log("EDITED_COMMENT_RESPONSE_DATA", response.data);
    const data = response.data.data;
    yield put(setComments({ data }));
  } catch (error) {
    console.log('error');
    yield toast.error('Edit comments Create Error');
  }
}


export function* deleteComments(value) {
  try {
    const response = yield call(deleteCommentsApi, value);
    console.log("DELETE_COMMENT_RESPONSE_DATA", response.data);
  } catch (error) {
    console.log('error');
    yield toast.error('Comments Delete Error');
  }
}

export function* watchCommentsApi() {
  yield takeLatest(GET_COMMENTS, getComments);
  yield takeLatest(CREATE_COMMENTS, createComments);
  yield takeLatest(DELETE_COMMENTS, deleteComments);
  yield takeLatest(EDIT_COMMENTS, editComments);
}
