import { combineReducers } from 'redux';
import page from './reducer_page';
import story from './reducer_story';
import user from './auth_reducer';

export default combineReducers({
  user, page, story
}),
