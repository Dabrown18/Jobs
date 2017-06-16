import * as firebase from '../firebase/firebase'
import { usersRef, usersByEmailsRef, storiesRef, storiesByStampsRef } from '../firebase/firebase'
import { sanitize } from './methods'
// create a user object with the value of the uid in the database
// user represents a json object
export function addUser(user, uid) {
  usersRef.child(uid).set({...user, bookmarks: [], bio: 'Helping people and reading stories...'});
  console.log('user.email', user.email);
  usersByEmailsRef.child(sanitize(user.email)).set(cleanUser(user));
  // usersByEmailsRef.push({uid});
}

export function updateUser(user, uid) {
  console.log('update user', user);
  let userRef = usersRef.child(uid);
  for (let key in user) {
    userRef.child(key).set(user[key]);
  }
}

// TODO fix these references!!!!
export function submitStory(json, user) {
  console.log('submitted json', json);
  console.log('submitStory to firebase', json, user.uid);
  let userStoryRef = storiesRef.child(user.uid);
  userStoryRef.child('user').set(user);
  userStoryRef.child('stories').child(user.uid).set(json);
  storiesByStampsRef.push({...json, user, timestamp: new Date().toString()});
}

export function getBookmarkKey(json) {
  let {story, user} = json;
  return sanitize(user.email+story.storyTitle.text);
}

// author is the user who created the story
export function getStoryKey(story, author) {
  return author.uid + story.storyTitle.text;
}

// TODO make more general,
// clean the json by removing any Objects or Arrays
function cleanUser(user) {
  let {uid, name, email, sex} = user;
  let json = {uid, name, email, sex};
  return json;
}

// json is the story object selected to be bookmarked by the user
export function addBookmark(json, user, authorUid, storyKey, stampKey, sex) {
  let bookmarkKey = getBookmarkKey(json);
  user = cleanUser(user);

  // TODO fix add bookmark to allow the bookmarks page to work,
  // adding a bookmark should only add the story and the user
  // TODO fix!
  let story = {...json};
  let storyObject = {story, user};
  usersRef.child(user.uid).child('bookmarks').child(bookmarkKey).set(storyObject);
  storiesRef.child(authorUid).child('stories').child(storyKey).child('bookmarks').child(sex).child(user.uid).set(storyObject);
  storiesByStampsRef.child(stampKey).child('bookmarks').child(sex).child(user.uid).set(user);
}

export function removeBookmark(json, user, authorUid, storyKey, stampKey, sex) {
  let bookmarkKey = getBookmarkKey(json);
  usersRef.child(user.uid).child('bookmarks').child(bookmarkKey).remove();
  storiesRef.child(authorUid).child('stories').child(storyKey).child('bookmarks').child(sex).child(user.uid).remove();
  storiesByStampsRef.child(stampKey).child('bookmarks').child(sex).child(user.uid).remove();
}

// returns if the user has this bookmark

// TODO address
// // bad
// console.log(object.hasOwnProperty(key));
//
// // good
// console.log(Object.prototype.hasOwnProperty.call(object, key));


export function checkBookmark(key, user) {
  if (key && user) {
    if (Object.prototype.hasOwnProperty.call(user, 'bookmarks')) { // TODO check if this works
      let bookmarks = user.bookmarks;
      if (bookmarks) {
        return bookmarks.hasOwnProperty(key);
      }
    }
  }
  return false;
}
