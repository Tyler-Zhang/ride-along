import geodist from 'geodist';
import { DirectionsService } from "../lib/mapbox";
import { API_KEY } from "../config/mapboxConfig";
import app from '../config/firebaseConfig';
import { firestore } from "firebase";

const firestoreApp = app.firestore();

function arePointsTooFar(pointA: firestore.GeoPoint, pointB: firestore.GeoPoint) {
  return geodist({
    lat: pointA.latitude,
    lon: pointA.longitude
  }, {
    lat: pointB.latitude,
    lon: pointB.longitude
  }) > 0.1;
}


export async function setRouteBetweenOfficers(officerA: any, officerB: any, officerDestination: firebase.firestore.DocumentReference) {
  let route = await new DirectionsService(API_KEY).getRoute(
    officerA.location,
    officerB.location
  );

  return officerDestination.set({
    route: JSON.stringify(route),
    start: officerA.location,
    end: officerB.location
  }, { merge: true });
}


export async function ensureOfficerDestinationFresh(officerDestinationRef: firebase.firestore.DocumentReference) {
  let officerDestinationData = await officerDestinationRef.get().then(d => d.data());

  let startingOfficer = await firestoreApp.collection('officers').doc(officerDestinationRef.id).get().then(d => d.data());
  let endingOfficer = await firestoreApp.collection('officers').doc(officerDestinationData.officerId).get().then(d => d.data());

  if (arePointsTooFar(startingOfficer.location, endingOfficer.location)) {
      return setRouteBetweenOfficers(startingOfficer, endingOfficer, officerDestinationRef);
  }
}
