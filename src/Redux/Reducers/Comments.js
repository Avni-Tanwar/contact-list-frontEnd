/* eslint-disable no-console */
import {
  SET_COMMENTS, SET_IS_LOADING, CLEAR_STORE
} from '../Constants/Comments';

const initialState = {
  comments: {},
};

const Comments = (state = initialState.comments, { type, value }) => {
  console.log('Type and value', type, value);
  switch (type) {
    case SET_COMMENTS:
      return { ...state, ...value };
    
    case SET_IS_LOADING:
      return { ...state, ...value }

    case CLEAR_STORE:
        return initialState.contacts;

    default:
      return state;
  }
};

export default Comments;
