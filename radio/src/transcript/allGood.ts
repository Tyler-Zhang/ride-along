import { IIntentResponse } from "../config/dialogFlowConfig";
import app, { OFFICERS_COLLECTION } from "../config/firebaseConfig";

const firestore = app.firestore();

export default async function allGood (intentResponse: IIntentResponse, officerId: string) {
  const officerRef = firestore.collection(OFFICERS_COLLECTION).doc(officerId);

  return officerRef.set({ 
    isRequestingAssistance: false,
    isInPursuit: false
  }, { merge: true });
}
