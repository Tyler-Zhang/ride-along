import * as React from 'react';
import SpeechRecognition from 'react-speech-recognition';

import app, { OFFICERS_COLLECTION } from './config/firebaseConfig';
import radioPicture from './radio.jpg';
import { processTranscript } from './transcript';

const firestore = app.firestore();

class Radio extends React.Component<any> {
  public componentDidMount() {
    this.props.stopListening();
  }

  public render() {
    const { interimTranscript } = this.props;

    return (
      <div>
        {
          this.props.listening && <span> Listening </span>
        }
        <div onClick={this.toggleRecording}>
          <img src={radioPicture}/>
        </div>

        <p>{interimTranscript}</p>
      </div>
    )
  }

  private toggleRecording = async () => {
    if(!this.props.listening) {
      this.props.startListening();
      firestore.collection(OFFICERS_COLLECTION).doc(this.props.officerId).update({
        isTalking: true
      });
      return;
    }
    
    this.props.resetTranscript();
    this.props.stopListening();
    const transcript = this.props.transcript;
    
    firestore.collection(OFFICERS_COLLECTION).doc(this.props.officerId).update({
      isTalking: false
    });
    
    try {
      await processTranscript(transcript, this.props.officerId);
    } catch (e) {
      console.error(e);
    }

  }
}

export default (SpeechRecognition as any)({ autostart: false })(Radio);
