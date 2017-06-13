import { SET_USER, UPDATE_USER, LOGIN_FAIL } from '../actions/types';

let user = {
  email: null,
  name: null,
  sex: null,
  age: null,
  bookmarks: null,
  profile: null,
  bio: null,
}

export default (state = user, action) => {
  switch(action.type) {

    case SET_USER:
      user = action.payload;
      return user;

    case LOGIN_FAIL:
      user = null
      return user;

    case UPDATE_USER:
      console.log('received update user action');
      for (var key in action.payload) {
        user[key] = action.payload[key];
      }
      return user;

    default:
      return state;
  }
}
