"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseConfig_1 = __importDefault(require("../config/firebaseConfig"));
const firebase_1 = require("firebase");
const firestoreApp = firebaseConfig_1.default.firestore();
//
// firestore.collection('officers_destination').where('type', '==', 'officer').onSnapshot(async (snapshot) => {
//   for(let change of snapshot.docChanges()) {
//     /**
//     * We only care about when a destination is added so that we can
//     * fetch the initial directions
//     */
//     if (change.type != 'added') {
//       return;
//     }
//
//     let data = change.doc.data();
//
//     /**
//     * If the route is already populated, that means this function has already
//     * run for the given record
//     */
//     if (data.route) {
//       return;
//     }
//
//     let officerId = change.doc.id;
//     let navigateToOfficerId = data.officerId;
//
//     let officer = await firestore.collection('officers').doc(officerId).get();
//     let navigateToOfficer = await firestore.collection('officers').doc(navigateToOfficerId).get();
//
//     const route = await new DirectionsService(API_KEY).getRoute(
//       officer.data().location,
//       navigateToOfficer.data().location
//     );
//
//     change.doc.ref.set({ route: JSON.stringify(route) }, { merge: true });
//   }
// });
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const fakeData = [
            { officerName: 'Jenkins',
                route: [{ location: new firebase_1.firestore.GeoPoint(-84.518399, 39.134126) },
                    { location: new firebase_1.firestore.GeoPoint(-84.51841, 39.133781) },
                    { location: new firebase_1.firestore.GeoPoint(-84.520024, 39.133456) },
                    { location: new firebase_1.firestore.GeoPoint(-84.520321, 39.132597) },
                    { location: new firebase_1.firestore.GeoPoint(-84.52085, 39.128019) },
                    { location: new firebase_1.firestore.GeoPoint(-84.52036, 39.127901) },
                    { location: new firebase_1.firestore.GeoPoint(-84.52094, 39.122783) },
                    { location: new firebase_1.firestore.GeoPoint(-84.52022, 39.122713) },
                    { location: new firebase_1.firestore.GeoPoint(-84.520768, 39.120841) },
                    { location: new firebase_1.firestore.GeoPoint(-84.519639, 39.120268) },
                    { location: new firebase_1.firestore.GeoPoint(-84.51233, 39.114141) },
                    { location: new firebase_1.firestore.GeoPoint(-84.512652, 39.11311) },
                    { location: new firebase_1.firestore.GeoPoint(-84.512399, 39.112216) },
                    { location: new firebase_1.firestore.GeoPoint(-84.513232, 39.112084) },
                    { location: new firebase_1.firestore.GeoPoint(-84.512127, 39.107599) },
                    { location: new firebase_1.firestore.GeoPoint(-84.512904, 39.107489) },
                    { location: new firebase_1.firestore.GeoPoint(-84.511692, 39.102682) },
                    { location: new firebase_1.firestore.GeoPoint(-84.511987, 39.102638) }] },
            { officerName: 'Billy',
                route: [{ location: new firebase_1.firestore.GeoPoint(-79.393277, 43.668882) },
                    { location: new firebase_1.firestore.GeoPoint(-79.39413, 43.668702) },
                    { location: new firebase_1.firestore.GeoPoint(-79.397395, 43.668039) },
                    { location: new firebase_1.firestore.GeoPoint(-79.398313, 43.66784) },
                    { location: new firebase_1.firestore.GeoPoint(-79.399817, 43.667511) },
                    { location: new firebase_1.firestore.GeoPoint(-79.401508, 43.66716) },
                    { location: new firebase_1.firestore.GeoPoint(-79.402679, 43.666913) },
                    { location: new firebase_1.firestore.GeoPoint(-79.403802, 43.666663) },
                    { location: new firebase_1.firestore.GeoPoint(-79.405331, 43.666369) },
                    { location: new firebase_1.firestore.GeoPoint(-79.406299, 43.666165) },
                    { location: new firebase_1.firestore.GeoPoint(-79.406634, 43.666099) },
                    { location: new firebase_1.firestore.GeoPoint(-79.407459, 43.665924) },
                    { location: new firebase_1.firestore.GeoPoint(-79.408641, 43.665677) },
                    { location: new firebase_1.firestore.GeoPoint(-79.409973, 43.665388) },
                    { location: new firebase_1.firestore.GeoPoint(-79.411205, 43.665132) },
                    { location: new firebase_1.firestore.GeoPoint(-79.412428, 43.664877) },
                    { location: new firebase_1.firestore.GeoPoint(-79.413633, 43.664609) },
                    { location: new firebase_1.firestore.GeoPoint(-79.414825, 43.664347) },
                    { location: new firebase_1.firestore.GeoPoint(-79.416023, 43.664085) },
                    { location: new firebase_1.firestore.GeoPoint(-79.417175, 43.663834) },
                    { location: new firebase_1.firestore.GeoPoint(-79.418416, 43.663557) },
                    { location: new firebase_1.firestore.GeoPoint(-79.418839, 43.663467) },
                    { location: new firebase_1.firestore.GeoPoint(-79.420891, 43.663027) },
                    { location: new firebase_1.firestore.GeoPoint(-79.422043, 43.66277) },
                    { location: new firebase_1.firestore.GeoPoint(-79.423248, 43.662509) },
                    { location: new firebase_1.firestore.GeoPoint(-79.424384, 43.662221) },
                    { location: new firebase_1.firestore.GeoPoint(-79.424588, 43.662178) },
                    { location: new firebase_1.firestore.GeoPoint(-79.425602, 43.661954) },
                    { location: new firebase_1.firestore.GeoPoint(-79.426069, 43.663015) },
                    { location: new firebase_1.firestore.GeoPoint(-79.427249, 43.662763) },
                    { location: new firebase_1.firestore.GeoPoint(-79.428442, 43.662502) },
                    { location: new firebase_1.firestore.GeoPoint(-79.429309, 43.664581) },
                    { location: new firebase_1.firestore.GeoPoint(-79.430486, 43.664315) },
                    { location: new firebase_1.firestore.GeoPoint(-79.431684, 43.664053) },
                    { location: new firebase_1.firestore.GeoPoint(-79.432909, 43.663763) },
                    { location: new firebase_1.firestore.GeoPoint(-79.434178, 43.66352) },
                    { location: new firebase_1.firestore.GeoPoint(-79.435425, 43.663249) },
                    { location: new firebase_1.firestore.GeoPoint(-79.435741, 43.663984) }] },
            { officerName: 'John',
                route: [{ location: new firebase_1.firestore.GeoPoint(-79.362284, 43.651665) },
                    { location: new firebase_1.firestore.GeoPoint(-79.362713, 43.651564) },
                    { location: new firebase_1.firestore.GeoPoint(-79.362979, 43.65221) },
                    { location: new firebase_1.firestore.GeoPoint(-79.363219, 43.652723) },
                    { location: new firebase_1.firestore.GeoPoint(-79.363579, 43.65356) },
                    { location: new firebase_1.firestore.GeoPoint(-79.363984, 43.654566) },
                    { location: new firebase_1.firestore.GeoPoint(-79.365297, 43.654266) },
                    { location: new firebase_1.firestore.GeoPoint(-79.36669, 43.653945) },
                    { location: new firebase_1.firestore.GeoPoint(-79.369105, 43.65338) },
                    { location: new firebase_1.firestore.GeoPoint(-79.371571, 43.652838) },
                    { location: new firebase_1.firestore.GeoPoint(-79.372812, 43.652706) },
                    { location: new firebase_1.firestore.GeoPoint(-79.37372, 43.652851) },
                    { location: new firebase_1.firestore.GeoPoint(-79.375439, 43.652452) },
                    { location: new firebase_1.firestore.GeoPoint(-79.376359, 43.652262) },
                    { location: new firebase_1.firestore.GeoPoint(-79.377751, 43.651973) },
                    { location: new firebase_1.firestore.GeoPoint(-79.378962, 43.651709) },
                    { location: new firebase_1.firestore.GeoPoint(-79.379034, 43.651883) }] }
        ];
        for (var i = 0; i < fakeData.length; i++) {
            const officer = (yield firestoreApp.collection('officers').where('name', '==', fakeData[i].officerName).get())[0];
            for (var j = 0; j < fakeData[i].route.length; j++) {
                setTimeout(function () {
                    officer.ref.set(fakeData[i].route[j], { merge: true });
                }, 1000);
            }
        }
    });
}
run();
//# sourceMappingURL=fetchDirectionsForOfficer.js.map