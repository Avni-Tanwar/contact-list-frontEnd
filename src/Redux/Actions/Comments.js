import {
  GET_COMMENTS, SET_COMMENTS, CREATE_COMMENTS, DELETE_COMMENTS, SET_IS_LOADING, CLEAR_STORE
} from '../Constants/Comments';

export const setComments = (value) => ({
  type: SET_COMMENTS,
  value,
});

export const getComments = (value) => ({
  type: GET_COMMENTS,
  value,
});

export const createComments = (value) => ({
  type: CREATE_COMMENTS,
  value,
});

export const deleteComments = (value) => ({
  type: DELETE_COMMENTS,
  value,
});


export const setIsLoading = (value) => ({
  type: SET_IS_LOADING,
  value,
});

export const removeComments = () => ({
  type: CLEAR_STORE,
})
