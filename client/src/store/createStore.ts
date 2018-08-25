import { reactReduxFirebase } from 'react-redux-firebase';
import { applyMiddleware, createStore, Middleware, Reducer, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reduxFirestore } from 'redux-firestore';
import firebaseApp from '../config/firebaseConfig';

const createApplicationStore = (rootReducer: Reducer) => {
  const middleware: Middleware[] = [];
  const enhancers: StoreEnhancer[] = [];

  /* ------------- Firebase Enhancer ----------------- */
  const firebaseConfig = {
    useFirestoreForProfile: true,
    userProfile: 'officers'
  };

  enhancers.push(
    reactReduxFirebase(firebaseApp, firebaseConfig),
    reduxFirestore(firebaseApp, firebaseConfig)
  );

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));


  const store = createStore(
    rootReducer,
    composeWithDevTools(...enhancers)
  );

  return store;
}

export default createApplicationStore;
