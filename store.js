import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase';
// import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import 'firebase/firestore'; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable

const firebaseConfig = {
  apiKey: 'AIzaSyDaA3jQkdsCQ8OdBFhAFSHqa9FkaqpdWQI',
  authDomain: 'adsocial-d7ee0.firebaseapp.com',
  databaseURL: 'https://adsocial-d7ee0.firebaseio.com',
  projectId: 'adsocial-d7ee0',
  storageBucket: '',
  messagingSenderId: '534262950806'
};

console.log('ENV VARS: ', firebaseConfig);

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Check to make sure firebase isn't already initialized
if (!firebase.apps.length) {
  // Initialize firebase instance
  firebase.initializeApp(firebaseConfig);
  // Initialize Cloud Firestore through Firebase
  const firestore = firebase.firestore();
  firestore.settings({
    timestampsInSnapshots: true
  });
}

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};

export function initializeStore() {
  return createStoreWithFirebase(rootReducer, initialState);
}
