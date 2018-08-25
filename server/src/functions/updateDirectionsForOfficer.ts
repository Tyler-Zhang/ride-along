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

import app from '../config/firebaseConfig';
import geodist from 'geodist';
import { firestore  } from 'firebase';
import { OfficerDestinationService } from '../services';

function arePointsTooFar(pointA: firestore.GeoPoint, pointB: firestore.GeoPoint) {
  return geodist({
    lat: pointA.latitude,
    lon: pointA.longitude
  }, {
    lat: pointB.latitude,
    lon: pointB.longitude
  }) > 50;
}

const firestoreApp = app.firestore();

firestoreApp.collection('officers').onSnapshot(async (snapshot) => {
  for(let change of snapshot.docChanges()) {
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
    let officerDestination = await firestoreApp.collection('officers_destination').doc(change.doc.id).get();

    if (officerDestination.exists) {
      let officerDestinationData = officerDestination.data();

      let start = officerDestinationData.start;

      if (arePointsTooFar(officerData.location, officerDestinationData.start)) {
        // Recalculate and update
        let navigateToOfficer = await firestoreApp.collection('officers').doc(officerDestinationData.officerId).get();
        let navigateToOfficerData = navigateToOfficer.data();

        await OfficerDestinationService.setRouteBetweenOfficers(officerData, navigateToOfficerData, officerDestination.ref);
      }
    }
  }
});


