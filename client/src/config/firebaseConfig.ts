import * as firebase from 'firebase';
import 'firebase/firestore';

export const OFFICERS_COLLECTION = 'officers';

export const OFFICERS_DESTINATION_COLLECTION = 'officers_destination';

export const EVENTS_COLLECTION = 'events';

const config = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
  authDomain: process.env.REACT_APP_GOOGLE_AUTH_DOMAIN as string,
  databaseURL: process.env.REACT_APP_GOOGLE_DATABASE_URL as string,
  projectId: process.env.REACT_APP_GOOGLE_PROJECT_ID as string,
  storageBucket: process.env.REACT_APP_GOOGLE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.REACT_APP_GOOGLE_MESSAGING_SENDER_ID as string,
};

const app = firebase.initializeApp(config);

const firestore = app.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default app;

