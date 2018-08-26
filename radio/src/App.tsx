import * as React from 'react';
import './App.css';

import app, { OFFICERS_COLLECTION } from './config/firebaseConfig';
import Radio from './Radio';

interface IState {
  name: string;
  officerId?: string;
}

const firestore = app.firestore();

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = { 
      name : '' 
    };
  }
  
  public render() {
    if (!this.state.name || !this.state.officerId) {
      return (
        <button
          onClick={this.promptForName}
          title="Login"
        > Login
        </button>
      )
    }

    return (<Radio officerId={this.state.officerId}/>)
  }

  private promptForName = async () => {
    const name = prompt('Whats your name?');

    if (!name) {
      return;
    }

    const results = await firestore.collection(OFFICERS_COLLECTION).where('name', '==', name).get();

    if (results.empty) {
      alert('Name not found!');
      return;
    }

    this.setState({
      name,
      officerId: results.docs[0].id
    })
  }
}

export default App;
