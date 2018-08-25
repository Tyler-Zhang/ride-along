import * as React from 'react';
import { Marker } from 'react-map-gl';
import Pulse from '../../../../components/Pulse/Pulse';
import { IOfficer } from '../../../../types/models';
import bike from './bike.svg';
import copcarImage from './copcar.png';
import footSteps from './footsteps.png';

interface IProps {
  officer: IOfficer
}

function getAppropriateImage(officer: IOfficer) {
  switch (officer.transportation) {
    case 'bicycle': return bike;
    case 'car': return copcarImage;
    case 'foot': return footSteps;
  }
}

export default ({ officer }: IProps) => (
  <Marker 
    longitude={officer.location.longitude}
    latitude={officer.location.latitude}
  >
    <div className="marker">
      <Pulse enabled={officer.isInDanger || officer.isRequestingAssistance}>
        <img className="icon" src={getAppropriateImage(officer)}/>
      </Pulse>
    </div>
  </Marker>
)
