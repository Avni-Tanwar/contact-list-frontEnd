import { combineReducers } from 'redux';
import Auth from './Auth';
import Contacts from './Contacts';
import Comments from './Comments';

const rootReducers = combineReducers({
  Auth,
  Contacts,
  Comments,
});

export default rootReducers;
