import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { OFFICERS_COLLECTION } from '../../config/firebaseConfig';

class MapContainer extends React.Component {
  render() {
    return <div />
  }
}

export default compose(
  firestoreConnect([OFFICERS_COLLECTION]),
  connect((state) => ({
    officers: state.firestore.data.officers,
    name: state.user.name
  }))
)(MapContainer);
