"use strict";
/**
 * The purpose of this module is to query for officers that may
 * or may not have moved. When a officer moves too far away from
 * the routes that they are involved in, we must recalculate
 * those paths.
 *
 * When an officer has moved and is the owner of a officer_destination
 * record, we should check the officer's distance from the first
 * point on the route. If there is a large different, we should
 * recalculate the route.
 *
 * Similarily, when an officer has moved and is the endpoint for an
 * officer_destination, we should check their distance from the last
 * point and update if necessary
 */
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
const geodist_1 = __importDefault(require("geodist"));
const services_1 = require("../services");
function arePointsTooFar(pointA, pointB) {
    return geodist_1.default({
        lat: pointA.latitude,
        lon: pointA.longitude
    }, {
        lat: pointB.latitude,
        lon: pointB.longitude
    }) > 50;
}
const firestoreApp = firebaseConfig_1.default.firestore();
firestoreApp.collection('officers').onSnapshot((snapshot) => __awaiter(this, void 0, void 0, function* () {
    for (let change of snapshot.docChanges()) {
        /**
         * Only care if an officer has been modified
         */
        if (change.type != 'modified') {
            return;
        }
        let officerData = change.doc.data();
        /**
         * First check if there's a officers_destination this this officer owns
         */
        let officerDestination = yield firestoreApp.collection('officers_destination').doc(change.doc.id).get();
        if (officerDestination.exists) {
            let officerDestinationData = officerDestination.data();
            let start = officerDestinationData.start;
            if (arePointsTooFar(officerData.location, officerDestinationData.start)) {
                // Recalculate and update
                let navigateToOfficer = yield firestoreApp.collection('officers').doc(officerDestinationData.officerId).get();
                let navigateToOfficerData = navigateToOfficer.data();
                yield services_1.OfficerDestinationService.setRouteBetweenOfficers(officerData, navigateToOfficerData, officerDestination.ref);
            }
        }
    }
}));
//# sourceMappingURL=updateDirectionsForOfficer.js.map