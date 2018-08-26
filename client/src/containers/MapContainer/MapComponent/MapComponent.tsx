import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import ReactMapGL, { Viewport } from 'react-map-gl';
import ResizeAware from 'react-resize-aware';
import { API_KEY } from '../../../config/mapboxConfig';
import { IOfficer, WithId } from '../../../types/models';
import { OfficerDestination } from '../../../types/models/OfficerDestination';
import './MapComponent.css';
import OfficerMarker from './OfficerMaker/OfficerMarker';

interface IProps {
  selfOfficer: WithId<IOfficer> | null;
  trackedOfficer: WithId<IOfficer> | null;
  officers: Array<WithId<IOfficer>>;
  isTrackingOfficer: boolean;
  officerDestinations: Array<WithId<OfficerDestination>>;
  onClickNavigateTo: (officerId: string) => any;
}

interface IState {
  viewport: Viewport;
  window: { width: number, height: number };
}

export default class MapComponent extends React.Component<IProps, IState> {
  private routeLayerIds: string[] = [];
  private mapRef = React.createRef();
  private updateMapMutex = false;

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
      }
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const trackedOfficer = nextProps.trackedOfficer;

    if (this.props.isTrackingOfficer && trackedOfficer) {
      const newViewport = {
        ...this.state.viewport,
        longitude: trackedOfficer.location.longitude,
        latitude: trackedOfficer.location.latitude
      };

      this.setState({ viewport: newViewport });
    }

    if (this.props.officerDestinations !== nextProps.officerDestinations) {
      this.setRoutesAsLayers(nextProps);
    }
  }

  public render() {
    return (
      <ResizeAware onResize={this.handleResize} className="map-component">
        <div style={{position: 'absolute'}}>
          <ReactMapGL
            {...this.state.window}
            {...this.state.viewport}
            mapboxApiAccessToken={API_KEY}
            onViewportChange={this.changeViewport}
            mapStyle="mapbox://styles/mapbox/navigation-preview-day-v2"
            ref={this.mapRef as any}
          >
            {
              this.props.officers.map(officer => (
                <OfficerMarker 
                  officer={officer} 
                  onClickNavigateTo={this.onClickNavigateToFactory(officer.id)}
                  key={officer.name}
                />
                )
              )
            }
          </ReactMapGL>
        </div>
      </ResizeAware>
    )
  }

  private changeViewport = (viewport: Viewport) => {
    const {isTrackingOfficer, trackedOfficer} = this.props;

    delete (viewport as any).width;
    delete (viewport as any).height;

    if (isTrackingOfficer && trackedOfficer) {
      viewport.longitude = trackedOfficer.location.longitude;
      viewport.latitude = trackedOfficer.location.latitude;
    }

    this.setState({ viewport });
  }

  private onClickNavigateToFactory = (officerId: string) => () => this.props.onClickNavigateTo(officerId);

  private handleResize = ({width, height}: { width: number, height: number}) => {
    this.setState({ window: { width, height }});
  }

  private setRoutesAsLayers = (props = this.props) => {
    const mapRef = this.mapRef.current;
    if (!mapRef) {
      return;
    }

    if (this.updateMapMutex) {
      return;
    }

    this.updateMapMutex = true;

    /**
     * Don't update if some routes haven't been calculated yet
     */
    if(props.officerDestinations.some(destination => !destination.route)) {
      this.updateMapMutex = false;
      return;
    }

    const map = (mapRef as any).getMap();
    
    // Remove existing route layers
    this.routeLayerIds.forEach(id => {
      map.removeLayer(id);
      map.removeSource(id);
    });

    this.routeLayerIds = [];

    // Add new route layers
    for (const officerDestination of props.officerDestinations) {
      const id = officerDestination.id;

      try {
        map.addSource(id, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: JSON.parse(officerDestination.route)
          }
        });

        map.addLayer({
          id,
          type: 'line',
          source: id,
          paint: {
            'line-width': 2
          }
        });

        this.routeLayerIds.push(id);
      } catch (e) {
        console.error(e);
      }
    }

    this.updateMapMutex = false;
  }
}
