import firebase from 'firebase';
import 'firebase/firestore';

export const OFFICERS_COLLECTION = 'officers';

const config = {
  apiKey: "AIzaSyDbwmflvAoANkO_pmXVaIF1rLOpXALWk7Y",
  authDomain: "ride-along-3f051.firebaseapp.com",
  databaseURL: "https://ride-along-3f051.firebaseio.com",
  projectId: "ride-along-3f051",
  storageBucket: "ride-along-3f051.appspot.com",
  messagingSenderId: "493355748883"
};

const app = firebase.initializeApp(config);

const firestore = app.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default app;

