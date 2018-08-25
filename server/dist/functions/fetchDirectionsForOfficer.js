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
const mapbox_1 = require("../lib/mapbox");
const mapboxConfig_1 = require("../config/mapboxConfig");
const firestore = firebaseConfig_1.default.firestore();
firestore.collection('officers_destination').where('type', '==', 'officer').onSnapshot((snapshot) => __awaiter(this, void 0, void 0, function* () {
    for (let change of snapshot.docChanges()) {
        /**
         * We only care about when a destination is added so that we can
         * fetch the initial directions
         */
        if (change.type != 'added') {
            return;
        }
        let data = change.doc.data();
        /**
         * If the route is already populated, that means this function has already
         * run for the given record
         */
        if (data.route) {
            return;
        }
        let officerId = change.doc.id;
        let navigateToOfficerId = data.officerId;
        let officer = yield firestore.collection('officers').doc(officerId).get();
        let navigateToOfficer = yield firestore.collection('officers').doc(navigateToOfficerId).get();
        const route = yield new mapbox_1.DirectionsService(mapboxConfig_1.API_KEY).getRoute(officer.data().location, navigateToOfficer.data().location);
        change.doc.ref.set({ route: JSON.stringify(route) }, { merge: true });
    }
}));
//# sourceMappingURL=fetchDirectionsForOfficer.js.map