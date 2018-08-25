import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { OFFICERS_DESTINATION_COLLECTION } from '../../config/firebaseConfig';
import { getOfficers } from '../../hocs';
import { MAP_TRACK_OFFICER } from '../../store/mapReducer';
import { IState } from '../../store/store';
import { WithId } from '../../types/models';
import { IOfficer } from '../../types/models/Officer';
import { OfficerDestination } from '../../types/models/OfficerDestination';
import MapComponent from './MapComponent/MapComponent';

interface IProps {
  selfName: string;
  officers: IOfficer[];
  officerDestinations: Array<WithId<OfficerDestination>>,
  selfOfficer: WithId<IOfficer> | null;
  isTrackingOfficer: boolean;
  trackedOfficer: WithId<IOfficer> | null;

  trackOfficer: (officerId: string) => any;
}

class MapContainer extends React.Component<IProps> {
  private hasTrackedSelfInitially = false;

  public componentWillReceiveProps(nextProps: IProps) {
    if (!this.hasTrackedSelfInitially && nextProps.selfOfficer) {
        this.props.trackOfficer(nextProps.selfOfficer.id);
        this.hasTrackedSelfInitially = true;
    }
  }

  public render() {
    return(
      <MapComponent
        selfOfficer={this.props.selfOfficer}
        trackedOfficer={this.props.trackedOfficer}
        officers={this.props.officers || []}
        isTrackingOfficer={this.props.isTrackingOfficer}
        officerDestinations={this.props.officerDestinations || []}
      />
    )
  }
}

export default compose(
  getOfficers,

  firestoreConnect([OFFICERS_DESTINATION_COLLECTION]),

  /**
   * Inject the officer that we should be tracking
   */
  connect((state: IState) => {
    const returnObj: any = {
      isTrackingOfficer: state.map.isTrackingOfficer,
      officerDestinations: state.firestore.ordered[OFFICERS_DESTINATION_COLLECTION]
    };

    if (state.map.isTrackingOfficer) {
      returnObj.trackedOfficer = state.firestore.data.officers[state.map.officerId];
    }

    return returnObj;
  }, (dispatch: Dispatch) => ({
    trackOfficer: (officerId: string) => dispatch({ type: MAP_TRACK_OFFICER, payload: { officerId }})
  }))
)(MapContainer);
