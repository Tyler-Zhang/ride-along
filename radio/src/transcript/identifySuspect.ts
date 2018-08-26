import firebase from 'firebase';
import { IIntentResponse } from "../config/dialogFlowConfig";
import app, { EVENTS_COLLECTION, OFFICERS_COLLECTION } from "../config/firebaseConfig";
import { ISuspectIdentifiedEvent } from "../types/models/Event";

const firestore = app.firestore();

export default async function identifySuspect (intentResponse: IIntentResponse, officerId: string) {
  const officerRef = firestore.collection(OFFICERS_COLLECTION).doc(officerId);
  const officer = await officerRef.get().then(d => d.data());

  if (!officer) {
    throw new Error('officer not found');
  }

  // Create a event
  const suspectIdentifiedEvent: ISuspectIdentifiedEvent = {
    location: officer.location,
    officerId,
    attributes: Object.keys(intentResponse.result.parameters).map(key => `${key}: ${intentResponse.result.parameters[key]}`),
    time: firebase.firestore.Timestamp.now(),
    type: 'suspect_identified'
  };

  await firestore.collection(EVENTS_COLLECTION).add(suspectIdentifiedEvent);
}
