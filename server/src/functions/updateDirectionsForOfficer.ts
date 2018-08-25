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
import { OfficerDestinationService } from '../services';


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
     * First check if there's a officers_destination that this officer owns
     */
    let officerDestinationRef = firestoreApp.collection('officers_destination').doc(change.doc.id);

    let officerDestination = await officerDestinationRef.get();

    if (officerDestination.exists) {
      OfficerDestinationService.ensureOfficerDestinationFresh(officerDestinationRef);
    }

    /**
     * Next let's check for routes that have this officer as the end point
     */
    let officerDestinations = await firestoreApp.collection('officers_destination').where('officerId', '==', change.doc.id).get();

    officerDestinations.forEach(documentSnapshot => OfficerDestinationService.ensureOfficerDestinationFresh(documentSnapshot.ref));
  }
});


