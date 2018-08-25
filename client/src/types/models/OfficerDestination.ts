export interface IOfficerDestinationNone {
  type: 'none';
}

export interface IOfficerDestinationOfficer {
  type: 'officer';
  officerId: string;
}

export type OfficerDestination = IOfficerDestinationNone | IOfficerDestinationOfficer;
