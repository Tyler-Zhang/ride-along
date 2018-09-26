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
    apiKey: process.env.GOOGLE_API_KEY,
    authDomain: process.env.GOOGLE_AUTH_DOMAIN,
    databaseURL: process.env.GOOGLE_DATABASE_URL,
    projectId: process.env.GOOGLE_PROJECT_ID,
    storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
    messagingSenderId: process.env.GOOGLE_MESSAGING_SENDER_ID,
};
const app = firebase.initializeApp(config);
const firestore = app.firestore();
firestore.settings({ timestampsInSnapshots: true });
exports.default = app;
//# sourceMappingURL=firebaseConfig.js.map
