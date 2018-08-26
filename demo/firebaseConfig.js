//import * as firebase from 'firebase';
var firebase = require('firebase');
require('firebase/firestore');

const OFFICERS_COLLECTION = 'officers';

const config = {
  apiKey: "AIzaSyAOos6vjP1Dro002uRz4dbMlXNzawYF914",
  authDomain: "police-232a4.firebaseapp.com",
  databaseURL: "https://police-232a4.firebaseio.com",
  projectId: "police-232a4",
  storageBucket: "police-232a4.appspot.com",
  messagingSenderId: "618248777258"
};

const app = firebase.initializeApp(config);

var firestore = firebase.firestore();

firestore.settings({ timestampsInSnapshots: true });

module.exports = {app: app};
