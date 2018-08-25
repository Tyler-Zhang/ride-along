import React from 'react';
import { compose } from 'recompose';
import { getOfficers } from '../../hocs';
import { IOfficer } from '../../types/models/Officer';
import MapComponent from './MapComponent/MapComponent';

interface IProps {
  selfName: string;
  officers: IOfficer[];
  selfOfficer: IOfficer | null;
}

class MapContainer extends React.Component<IProps> {
  public render() {
    return(
      <MapComponent
        selfOfficer={this.props.selfOfficer}
        officers={this.props.officers || []}
      />
    )
  }
}

export default compose(
  getOfficers
)(MapContainer);
