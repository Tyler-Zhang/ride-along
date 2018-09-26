import * as firebase from 'firebase';
import 'firebase/firestore';

export const OFFICERS_COLLECTION = 'officers';

export const OFFICERS_DESTINATION_COLLECTION = 'officers_destination';

export const EVENTS_COLLECTION = 'events';

const config = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: process.env.REACT_APP_GOOGLE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_GOOGLE_DATABASE_URL,
  projectId: process.env.REACT_APP_GOOGLE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_GOOGLE_MESSAGING_SENDER_ID,
};

const app = firebase.initializeApp(config);

const firestore = app.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default app;

