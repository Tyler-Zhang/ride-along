import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

import MapContainer from './containers/MapContainer/MapContainer';
import PickNameContainer from './containers/PickNameContainer/PickNameContainer';

import './App.css'

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="app">
          <PickNameContainer>
            <MapContainer/>
          </PickNameContainer>
        </div>
      </Provider>
    );
  }
}

export default App;
