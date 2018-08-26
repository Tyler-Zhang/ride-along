import axios from 'axios';

const URL = 'https://api.dialogflow.com/v1/query';
// const PROJECT_ID = 'ride-along-602ae';
const SESSION_ID = 'quick-start-session-id';
const CLIENT_ACCESS_TOKEN ='de19d6e89d3c4602aa6af8d9eb4a7616';
const LANGUAGE_CODE = 'en-US';

export interface IIntentResponse {
  id: string;
  lang: string;
  result: {
    action: string;
    metadata: {
      intentName: string;
    }
  }
  parameters: Record<string, string>
}

export default async function detectIntent (text: string) {
  const response = await axios.get(URL, {
    params: {
      lang: LANGUAGE_CODE,
      sessionId: SESSION_ID,
      query: text
    },

    headers: {
      Authorization: `Bearer ${CLIENT_ACCESS_TOKEN}`
    }
  });

  const data = response.data;

  return data as IIntentResponse;
}
