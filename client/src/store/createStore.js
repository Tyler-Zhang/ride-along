import { createStore, compose, applyMiddleware } from 'redux';
import { reduxFirestore } from 'redux-firestore';
import firebaseApp from '../config/firebaseConfig';
import { reactReduxFirebase } from 'react-redux-firebase';

const createApplicationStore = (rootReducer) => {
  const middleware = [];
  const enhancers = [];

  /* ------------- Firebase Enhancer ----------------- */
  const firebaseConfig = {
    userProfile: 'officers',
    useFirestoreForProfile: true
  };

  enhancers.push(
    reactReduxFirebase(firebaseApp, firebaseConfig),
    reduxFirestore(firebaseApp, firebaseConfig)
  );

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));


  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(...enhancers)
  );

  return store;
}

export default createApplicationStore;
