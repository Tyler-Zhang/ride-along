import * as _ from 'lodash';
import { IIntentResponse } from "../config/dialogFlowConfig";
import app, { OFFICERS_COLLECTION } from "../config/firebaseConfig";

const firestore = app.firestore();

export default async function changeTransportation (intentResponse: IIntentResponse, officerId: string) {
  const officerRef = firestore.collection(OFFICERS_COLLECTION).doc(officerId);

  const transportation = intentResponse.result.parameters.transportation;

  if (!_.includes(['car', 'foot', 'bicycle'], transportation)) {
    throw new Error(`The form of transportaiton ${transportation} is not supported`);
  }

  return officerRef.set({ transportation }, { merge: true });
}
