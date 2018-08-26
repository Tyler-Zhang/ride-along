import { IIntentResponse } from "../config/dialogFlowConfig";
import app from "../config/firebaseConfig";

const firestore = app.firestore();

export default function changeTransportation (intentResponse: IIntentResponse, officerId: string) {
    return;
}
