import * as React from 'react';
import SpeechRecognition from 'react-speech-recognition';

import radioPicture from './radio.jpg';
import { processTranscript } from './transcript';

class Radio extends React.Component<any> {
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

  private toggleRecording = () => {
    if(!this.props.listening) {
      this.props.startListening();
      return;
    }
    
    this.props.resetTranscript();
    this.props.stopListening();
    const transcript = this.props.transcript;
    
    processTranscript(transcript, this.props.officerId);
  }
}

export default (SpeechRecognition as any)({ autostart: false })(Radio);
