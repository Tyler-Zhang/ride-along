import createStore from './createStore';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import userReducer from './UserReducer';

const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  user: userReducer
});

const store = createStore(reducers);

export default store;
