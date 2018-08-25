export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IOfficer {
  name: string;
  squad: string;
  location: ILocation;
  isRequestingAssistance: boolean;
  isInDanger: boolean;
  isTalking: boolean;
  speech?: string;
  transportation: 'car' | 'foot' | 'bicycle';
}
