import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import createStore from './createStore';

import mapReducer, { IMapState } from './mapReducer';
import userReducer, { IUserState } from './userReducer';

export interface IState {
  firebase: any,
  firestore: any,
  user: IUserState,
  map: IMapState
}

const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  user: userReducer,
  map: mapReducer
});

const store = createStore(reducers);

export default store;
