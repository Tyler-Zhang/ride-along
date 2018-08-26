import firebase from 'firebase';
import { IIntentResponse } from "../config/dialogFlowConfig";
import app, { EVENTS_COLLECTION, OFFICERS_COLLECTION, OFFICERS_DESTINATION_COLLECTION } from "../config/firebaseConfig";
import { IOfficerNavigateToEvent } from "../types/models/Event";

const firestore = app.firestore();

export default async function startNavigation (intentResponse: IIntentResponse, officerId: string) {
  const officerRef = firestore.collection(OFFICERS_COLLECTION).doc(officerId);
  const officer = await officerRef.get().then(d => d.data());

  if (!officer) {
    throw new Error('officer not found');
  }
  
  const otherOfficerName = intentResponse.result.parameters['last-name'];

  const otherOfficerQuery = await firestore.collection(OFFICERS_COLLECTION).where('name', '==', otherOfficerName.toLowerCase()).get();

  if (otherOfficerQuery.empty) {
    throw new Error('couldn\'t find an officer by that name');
  }

  const otherOfficerId = otherOfficerQuery.docs[0].id;

  // Create a event
  const officerNavigateEvent: IOfficerNavigateToEvent = {
    location: officer.location,
    officerId,
    time: firebase.firestore.Timestamp.now(),
    toOfficerId: otherOfficerId,
    type: 'navigate_to'
  };

  await firestore.collection(EVENTS_COLLECTION).add(officerNavigateEvent);
  
  await firestore.collection(OFFICERS_DESTINATION_COLLECTION).doc(officerId).delete();

  await firestore.collection(OFFICERS_DESTINATION_COLLECTION).doc(officerId).set({
    type: 'officer',
    officerId: otherOfficerId
  });
}
