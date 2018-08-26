import { firestore } from 'firebase';
import app, { EVENTS_COLLECTION, OFFICERS_COLLECTION, OFFICERS_DESTINATION_COLLECTION } from '../config/firebaseConfig';
import { IOfficerNavigateToEvent } from '../types/models/Event';

const firestoreApp = app.firestore();

export async function navigateToOfficer(selfId: string, otherOfficerId: string) {
  await firestoreApp.collection(OFFICERS_DESTINATION_COLLECTION).doc(selfId).delete();

  await firestoreApp.collection(OFFICERS_DESTINATION_COLLECTION).doc(selfId).set({
    type: 'officer',
    officerId: otherOfficerId
  });

  const selfOfficer = await firestoreApp.collection(OFFICERS_COLLECTION).doc(selfId).get().then(d => d.data());

  const event: IOfficerNavigateToEvent = {
    type: 'navigate_to',
    officerId: selfId,
    toOfficerId: otherOfficerId,
    location: selfOfficer && selfOfficer.location,
    time: firestore.Timestamp.now()
  }

  await firestoreApp.collection(EVENTS_COLLECTION).add(event);
}
