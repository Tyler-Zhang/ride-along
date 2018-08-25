import { DirectionsService } from "../lib/mapbox";
import { API_KEY } from "../config/mapboxConfig";

export async function setRouteBetweenOfficers(officerA: any, officerB: any, officerDestination: firebase.firestore.DocumentReference) {
  let route = await new DirectionsService(API_KEY).getRoute(
    officerA.location,
    officerB.location
  );

  return officerDestination.set({
    route: JSON.stringify(route),
    start: officerA.location,
    end: officerB.location
  }, { merge: true });
}
