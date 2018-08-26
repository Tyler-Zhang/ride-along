import * as React from 'react';
import { Marker } from 'react-map-gl';
import { Event } from '../../../../types/models/Event';
import banditImage from './bandit.png';
import gunImage from './gun.svg';
import helpImage from './help.png';


interface IProps {
  event: Event
}

function getAppropriateImage(event: Event) {
  switch (event.type) {
    case 'guns_fired':
      return gunImage;
    case 'need_assistance':
      return helpImage;
    case 'suspect_identified':
      return banditImage;
    default:
      return '';
  }
}

export default ({ event }: IProps) => (
  <Marker 
    longitude={event.location.longitude}
    latitude={event.location.latitude}
  >
    <div className="marker">
      <img className="icon" src={getAppropriateImage(event)}/>
    </div>
  </Marker>
)
