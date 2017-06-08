import * as firebase from 'firebase'
import { firebaseKey } from '../secrets/secrets'

const config = {
  apiKey: firebaseKey,
  authDomain: 'the-ladies-champion.firebaseapp.com',
  databaseURL: 'https://the-ladies-champion.firebaseio.com',
  projectId: 'the-ladies-champion',
  storageBucket: 'the-ladies-champion.appspot.com',
  messagingSenderId: '114925524999'
}

export const firebaseApp = firebase.initializeApp(config)
export const storage = firebase.storage()
export const generalRef = firebase.database().ref()
export const usersRef = firebase.database().ref('users')
export const usersByEmailsRef = firebase.database().ref('userByEmails') // holds the uid of the user
export const storiesRef = firebase.database().ref('stories') // each key is a user id
export const storiesByStampsRef = firebase.database().ref('storiesByStamps')
