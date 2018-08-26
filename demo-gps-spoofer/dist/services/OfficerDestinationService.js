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
const geodist_1 = __importDefault(require("geodist"));
const mapbox_1 = require("../lib/mapbox");
const mapboxConfig_1 = require("../config/mapboxConfig");
const firebaseConfig_1 = __importDefault(require("../config/firebaseConfig"));
const firestoreApp = firebaseConfig_1.default.firestore();
function arePointsTooFar(pointA, pointB) {
    return geodist_1.default({
        lat: pointA.latitude,
        lon: pointA.longitude
    }, {
        lat: pointB.latitude,
        lon: pointB.longitude
    }) > 0.1;
}
function setRouteBetweenOfficers(officerA, officerB, officerDestination) {
    return __awaiter(this, void 0, void 0, function* () {
        let route = yield new mapbox_1.DirectionsService(mapboxConfig_1.API_KEY).getRoute(officerA.location, officerB.location);
        return officerDestination.set({
            route: JSON.stringify(route),
            start: officerA.location,
            end: officerB.location
        }, { merge: true });
    });
}
exports.setRouteBetweenOfficers = setRouteBetweenOfficers;
function ensureOfficerDestinationFresh(officerDestinationRef) {
    return __awaiter(this, void 0, void 0, function* () {
        let officerDestinationData = yield officerDestinationRef.get().then(d => d.data());
        let startingOfficer = yield firestoreApp.collection('officers').doc(officerDestinationRef.id).get().then(d => d.data());
        let endingOfficer = yield firestoreApp.collection('officers').doc(officerDestinationData.officerId).get().then(d => d.data());
        if (arePointsTooFar(startingOfficer.location, endingOfficer.location)) {
            return setRouteBetweenOfficers(startingOfficer, endingOfficer, officerDestinationRef);
        }
    });
}
exports.ensureOfficerDestinationFresh = ensureOfficerDestinationFresh;
//# sourceMappingURL=OfficerDestinationService.js.map