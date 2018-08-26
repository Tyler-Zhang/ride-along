import detectIntent from '../config/dialogFlowConfig';
import allGood from './allGood';
import changeTransportation from './changeTransportation';
import goInPursuit from './goInPursuit';
import identifySuspect from './identifySuspect';
import sendHelp from './sendHelp';
import shotsFired from './shotsFired';
import startNavigation from './startNavigation';

const ALL_GOOD_TOPIC = 'all_good';
const CHANGE_TRANSPORTATION_TOPIC = 'change_transportation';
const GO_IN_PURSUIT_TOPIC = 'go_in_pursuit';
const IDENTIFY_SUSPECT_TOPIC = 'identify_suspect';
const SEND_HELP_TOPIC = 'send_help';
const SHOTS_FIRED_TOPIC = 'shots_fired';
const START_NAVIGATION_TOPIC = 'start_navigation';

const INTENT_MAP = {
  [ALL_GOOD_TOPIC]: allGood,
  [CHANGE_TRANSPORTATION_TOPIC]: changeTransportation,
  [GO_IN_PURSUIT_TOPIC]: goInPursuit,
  [IDENTIFY_SUSPECT_TOPIC]: identifySuspect,
  [SEND_HELP_TOPIC]: sendHelp,
  [SHOTS_FIRED_TOPIC]: shotsFired,
  [START_NAVIGATION_TOPIC]: startNavigation
}


export async function processTranscript(transcript: string, officerId: string) {
  const intentResponse = await detectIntent(transcript);

  const intentName = intentResponse.result.metadata.intentName;

  if (!intentName) {
    throw new Error('No intent found');
  }

  const intentHandler = INTENT_MAP[intentName];
  
  if (!intentHandler) {
      throw new Error('This intent could not be handled');
  }

  intentHandler(intentResponse, officerId);
} 
