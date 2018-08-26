import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

import ControlPanelContainer from './containers/ControlPanelContainer/ControlPanelContainer';
import EventsContainer from './containers/EventsContainer/EventsContainer';
import MapContainer from './containers/MapContainer/MapContainer';
import PickNameContainer from './containers/PickNameContainer/PickNameContainer';

import './App.css'

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="app">
          <PickNameContainer>
            <div className="authenticated-container">
              <div className="left-main-section">
                <ControlPanelContainer/>
                <MapContainer/>
              </div>

              <div className="events-section">
                <EventsContainer/>
              </div>
            </div>
          </PickNameContainer>
        </div>
      </Provider>
    );
  }
}

export default App;
