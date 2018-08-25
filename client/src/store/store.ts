import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import createStore from './createStore';

import userReducer, { IUserState } from './userReducer';

export interface IState {
  firebase: any,
  firestore: any,
  user: IUserState
}

const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  user: userReducer
});

const store = createStore(reducers);

export default store;
