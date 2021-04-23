import { combineReducers } from 'redux';
import Auth from './Auth';
import Contacts from './Contacts';

const rootReducers = combineReducers({
  Auth,
  Contacts,
});

export default rootReducers;
