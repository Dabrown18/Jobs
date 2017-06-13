import { AsyncStorage } from 'react-native';
import types from './types';
import { LOAD_NEWS, SEARCH_NEWS } from './types';
import mockData from '../mockData.json';


export const loadNews = () => ({
  type: LOAD_NEWS,
  payload: mockData
});

export const searchNews = searchTerm => ({
  type: SEARCH_NEWS,
  payload: searchTerm
});


export function receiveUser(json, uid) {
  return {
    type: types.SET_USER,
    payload: {...json, uid}
  }
}

export function setUserObject(json) {
  return {
    type: types.SET_USER,
    payload: json
  }
}

export function setUser(uid) {
  return dispatch => {
    usersRef.child(uid).once('value').then(snapshot => {
      let user = snapshot.val();
      console.log('user in setUser', user);
      AsyncStorage.setItem(types.USER_TOKEN, JSON.stringify(user));
      dispatch(receiveUser(user, uid))
    })
  }
}

export function updateUser(json, uid) {
  console.log('json', json, 'uid', uid);
  for (var key in json) {
    usersRef.child(uid).child(key).set(json[key]);
  }
  return {
    type: types.UPDATE_USER,
    payload: json
  }
}

export function changePage(page) {
  return {
    type: types.CHANGE_PAGE,
    payload: {
      activePage: page
    }
  }
}

export function updateStory(json, uid) {
  // update the story in the databaes, add a uid key
  console.log('updateStory action', json, uid);
  return {
    type: types.UPDATE_STORY,
    payload: json
  }
}

export function setStory(json) {
  return {
    type: types.SET_STORY,
    payload: json
  }
}

// json consists of the commenter's user info and comment
// json: {user: {}, comment: ''}
export function submitComment(json, authorUid, storyKey) {
  storiesRef.child(authorUid).child('stories').child(storyKey).child('comments').push(json);
  return {
    type: types.SUBMIT_COMMENT,
    payload: json
  }
}
