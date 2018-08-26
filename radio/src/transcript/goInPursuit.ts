import firebase from 'firebase';
import { IIntentResponse } from "../config/dialogFlowConfig";
import app, { EVENTS_COLLECTION, OFFICERS_COLLECTION } from "../config/firebaseConfig";
import { IOfficerGoingIntoPursuit } from "../types/models/Event";

const firestore = app.firestore();

export default async function goInPursuit (intentResponse: IIntentResponse, officerId: string) {
  const officerRef = firestore.collection(OFFICERS_COLLECTION).doc(officerId);
  const officer = await officerRef.get().then(d => d.data());

  if (!officer) {
    throw new Error('officer not found');
  }

  // Create a event
  const goingIntoPursuitEvent: IOfficerGoingIntoPursuit = {
    location: officer.location,
    officerId,
    time: firebase.firestore.Timestamp.now(),
    type: 'going_into_pursuit'
  };

  await firestore.collection(EVENTS_COLLECTION).add(goingIntoPursuitEvent);
  await officerRef.set({ isInPursuit: true }, { merge: true });
}
