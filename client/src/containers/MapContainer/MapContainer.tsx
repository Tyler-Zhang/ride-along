import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { getOfficers } from '../../hocs';
import { MAP_TRACK_OFFICER } from '../../store/mapReducer';
import { IState } from '../../store/store';
import { IOfficer } from '../../types/models/Officer';
import MapComponent from './MapComponent/MapComponent';

interface IProps {
  selfName: string;
  officers: IOfficer[];
  selfOfficer: IOfficer | null;
  trackedOfficer: IOfficer | null;

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
      />
    )
  }
}

export default compose(
  getOfficers,

  /**
   * Inject the officer that we should be tracking
   */
  connect((state: IState) => {
    if (state.map.isTrackingOfficer) {
      return {
        trackedOfficer: state.firestore.data.officers[state.map.officerId]
      };
    }
    return {};
  }, (dispatch: Dispatch) => ({
    trackOfficer: (officerId: string) => dispatch({ type: MAP_TRACK_OFFICER, payload: { officerId }})
  }))
)(MapContainer);
