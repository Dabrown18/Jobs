import { combineReducers } from 'redux';
import page from './reducer_page';
import story from './reducer_story';
import auth from './auth_reducer';

export default combineReducers({
  auth, page, story
}),
