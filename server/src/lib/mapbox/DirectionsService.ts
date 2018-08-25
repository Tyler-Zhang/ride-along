import axios from 'axios';

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface DirectionResponse {

}

function coordinateToCsv(coord: Coordinates) {
  return `${coord.longitude},${coord.latitude}`
}

export type DirectionProfile = 'driving' | 'driving-traffic' | 'walking' | 'cycling';

export default class DirectionsService {
  private BASE_URL = "https://api.mapbox.com";
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getRoute(coordA: Coordinates, coordB: Coordinates, profile: DirectionProfile = 'driving') {
    const result = await axios.get(
      `${this.BASE_URL}/directions/v5/mapbox/${profile}/${coordinateToCsv(coordA)};${coordinateToCsv(coordB)}?geometries=geojson&access_token=${this.accessToken}`
    );

    return result.data.routes[0].geometry;
  }
}

