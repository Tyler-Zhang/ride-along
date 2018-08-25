"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = __importStar(require("firebase"));
require("firebase/firestore");
exports.OFFICERS_COLLECTION = 'officers';
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
exports.default = app;
//# sourceMappingURL=firebaseConfig.js.map