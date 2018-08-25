import * as firebase from 'firebase';
import 'firebase/firestore';

export const OFFICERS_COLLECTION = 'officers';

export const OFFICERS_DESTINATION_COLLECTION = 'officers_destination';

export const EVENTS_COLLECTION = 'events';

const config = {
  apiKey: "AIzaSyAOos6vjP1Dro002uRz4dbMlXNzawYF914",
  authDomain: "police-232a4.firebaseapp.com",
  databaseURL: "https://police-232a4.firebaseio.com",
  projectId: "police-232a4",
  storageBucket: "police-232a4.appspot.com",
  messagingSenderId: "618248777258"
};

const app = firebase.initializeApp(config);

const firestore = app.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default app;

