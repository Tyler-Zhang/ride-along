import firebase from 'firebase';
import { IIntentResponse } from "../config/dialogFlowConfig";
import app, { EVENTS_COLLECTION, OFFICERS_COLLECTION } from "../config/firebaseConfig";
import { IGunsFiredEvent } from "../types/models/Event";

const firestore = app.firestore();

export default async function shotsFired (intentResponse: IIntentResponse, officerId: string) {
  const officerRef = firestore.collection(OFFICERS_COLLECTION).doc(officerId);
  const officer = await officerRef.get().then(d => d.data());

  if (!officer) {
    throw new Error('officer not found');
  }

  // Create a event
  const gunsFiredEvent: IGunsFiredEvent = {
    location: officer.location,
    officerId,
    time: firebase.firestore.Timestamp.now(),
    type: 'guns_fired'
  };

  await firestore.collection(EVENTS_COLLECTION).add(gunsFiredEvent);
}
