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

export interface IOfficerNeedAssistanceEvent extends IBaseEvent, ISpatialEvent {
  type: 'need_assistance';
}

export interface IGunsFiredEvent extends IBaseEvent, ISpatialEvent {
  type: 'guns_fired';
}

export interface IOfficerGoingIntoPursuit extends IBaseEvent, ISpatialEvent {
  type: 'going_into_pursuit';
}

export interface ISuspectIdentifiedEvent extends IBaseEvent, ISpatialEvent {
  type: 'suspect_identified';
  attributes: string[]
}

export type Event = IOfficerNavigateToEvent | 
  IOfficerNeedAssistanceEvent | 
  IGunsFiredEvent | 
  IOfficerGoingIntoPursuit |
  ISuspectIdentifiedEvent;
