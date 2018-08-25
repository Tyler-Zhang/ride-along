import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import ReactMapGL, { Viewport } from 'react-map-gl';
import { API_KEY } from '../../../config/mapboxConfig';
import { IOfficer } from '../../../types/models';
import './MapComponent.css';
import OfficerMarker from './OfficerMaker/OfficerMarker';

interface IProps {
  selfOfficer: IOfficer | null;
  officers: IOfficer[];
}

interface IState {
  viewport: Viewport;
  window: { width: number, height: number };
  isCenteredOnSelf: boolean;
}

export default class MapComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      window: {
        width: 500,
        height: 500
      },
      viewport: {
        zoom: 8,
        longitude: -79,
        latitude: 43
      },
      isCenteredOnSelf: true
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const selfOfficer = nextProps.selfOfficer;

    if (this.state.isCenteredOnSelf && selfOfficer) {
      const newViewport = {
        ...this.state.viewport,
        longitude: selfOfficer.location.longitude,
        latitude: selfOfficer.location.latitude
      };

      this.setState({ viewport: newViewport });
    }
  }

  public render() {
    return (
      <ReactMapGL
        {...this.state.window}
        {...this.state.viewport}
        mapboxApiAccessToken={API_KEY}
        onViewportChange={this.changeViewport}
        mapStyle="mapbox://styles/mapbox/navigation-preview-day-v2"
      >
        {
          this.props.officers.map(officer => <OfficerMarker officer={officer} key={officer.name}/>)
        }
      </ReactMapGL>
    )
  }

  private changeViewport = (viewport: Viewport) => {
    if(!this.state.isCenteredOnSelf) {
      this.setState({ viewport })
    }
  }
}
