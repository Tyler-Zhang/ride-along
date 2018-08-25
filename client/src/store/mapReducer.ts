import { IAction } from '../types/applicationReducer';

export const MAP_TRACK_OFFICER = 'map/TRACK_OFFICER';
export interface IMapTrackOfficerPayload {
  officerId: string
}

export const MAP_STOP_TRACKING_OFFICER = 'map/STOP_TRACKING_OFFICER';

export type MapAction = 
  IAction<typeof MAP_TRACK_OFFICER, IMapTrackOfficerPayload> |
  IAction<typeof MAP_STOP_TRACKING_OFFICER, {}>
// States

export interface IMapState {
  isTrackingOfficer: boolean;
  officerId: string;
}

const initialState: IMapState = {
  isTrackingOfficer: false,
  officerId: ''
};

// Reducer

export default (state = initialState, action: MapAction) => {
  switch (action.type) {
    case MAP_TRACK_OFFICER:
      return {
        ...state,
        isTrackingOfficer: true,
        officerId: action.payload.officerId
      }
    case MAP_STOP_TRACKING_OFFICER:
      return {
        ...state,
        isTrackingOfficer: false,
        officerId: ''
      };
    default:
      return state;
  }
}
