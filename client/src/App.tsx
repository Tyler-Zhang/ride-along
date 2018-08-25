import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

import MapContainer from './containers/MapContainer/MapContainer';

import './App.css'

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="app">
          <MapContainer/>
        </div>
      </Provider>
    );
  }
}

export default App;