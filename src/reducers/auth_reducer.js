import { SET_USER, UPDATE_USER, LOGIN_FAIL } from '../actions/types';

let auth = {
  email: null,
  name: null,
  sex: null,
  age: null,
  bookmarks: null,
  profile: null,
  bio: null,
}

export default (state = auth, action) => {
  switch(action.type) {

    case SET_USER:
      auth = action.payload;
      return auth;

    case LOGIN_FAIL:
      auth = null
      return auth;

    case UPDATE_USER:
      console.log('received update user action');
      for (var key in action.payload) {
        auth[key] = action.payload[key];
      }
      return auth;

    default:
      return state;
  }
}
