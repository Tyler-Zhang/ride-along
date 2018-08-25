export interface IBaseEvent {
  time: firebase.firestore.Timestamp;
  officerId: string;
}

export interface ISpatialEvent {
  location: firebase.firestore.GeoPoint;
}

export interface IOfficerNavigateToEvent extends IBaseEvent, ISpatialEvent {
  type: 'navigate_to';
  toOfficerId: string;
}

export interface IOfficerInDangerEvent extends IBaseEvent, ISpatialEvent {
  type: 'officer_in_danger';
}

export interface IGunsFiredEvent extends IBaseEvent, ISpatialEvent {
  type: 'guns_fired';
}
