import app from '../config/firebaseConfig';
import { DirectionsService } from '../lib/mapbox';
import { API_KEY } from '../config/mapboxConfig';
//import { firestore } from 'firebase';

const firestore = app.firestore();

 firestore.collection('officers_destination').where('type', '==', 'officer').onSnapshot(async (snapshot) => {
   for(let change of snapshot.docChanges()) {
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

     let officer = await firestore.collection('officers').doc(officerId).get();
     let navigateToOfficer = await firestore.collection('officers').doc(navigateToOfficerId).get();

     const route = await new DirectionsService(API_KEY).getRoute(
       officer.data().location,
       navigateToOfficer.data().location
     );

     change.doc.ref.set({ route: JSON.stringify(route) }, { merge: true });
   }
 });
