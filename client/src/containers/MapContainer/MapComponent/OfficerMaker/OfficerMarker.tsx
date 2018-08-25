import { Tooltip } from 'antd';
import * as React from 'react';
import { Marker } from 'react-map-gl';
import OfficerActionPopover from '../../../../components/OfficerActionPopover/OfficerActionPopover';
import Pulse from '../../../../components/Pulse/Pulse';
import { IOfficer } from '../../../../types/models';
import bike from './bike.svg';
import copcarImage from './copcar.png';
import footSteps from './footsteps.png';

interface IProps {
  officer: IOfficer;
  onClickNavigateTo: () => any;
}

function getAppropriateImage(officer: IOfficer) {
  switch (officer.transportation) {
    case 'bicycle': return bike;
    case 'car': return copcarImage;
    case 'foot': return footSteps;
  }
}

export default ({ officer, onClickNavigateTo }: IProps) => (
  <Marker 
    longitude={officer.location.longitude}
    latitude={officer.location.latitude}
  >
    <div className="marker">
      <Tooltip
        placement="bottom"
        title="speaking"
        visible={officer.isTalking}
      >
        <Pulse enabled={officer.isInDanger || officer.isRequestingAssistance}>
          <OfficerActionPopover
            onClickNavigateTo={onClickNavigateTo}
          >
            <img className="icon" src={getAppropriateImage(officer)}/>
          </OfficerActionPopover>
        </Pulse>
      </Tooltip>
    </div>
  </Marker>
)
