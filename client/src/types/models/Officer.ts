export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IDestinationNone {
  type: 'none';
}

export interface IDestinationOfficer {
  type: 'officer';
  officerId: string;
}

export type IDestination = IDestinationNone | IDestinationOfficer

export interface IOfficer {
  id: string;
  name: string;
  squad: string;
  location: ILocation;
  isRequestingAssistance: boolean;
  isInDanger: boolean;
  isTalking: boolean;
  speech: string;
  destination: IDestination;
  transportation: 'car' | 'foot' | 'bicycle';
}
