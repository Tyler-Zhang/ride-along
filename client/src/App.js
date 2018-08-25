import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

import MapContainer from './containers/MapContainer/MapContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MapContainer/>
      </Provider>
    );
  }
}

export default App;
