import { LocationInterface } from 'interfaces/location';
import { GetQueryInterface } from 'interfaces';

export interface PetrolStationInterface {
  id?: string;
  name: string;
  distance?: number;
  location_id?: string;
  created_at?: any;
  updated_at?: any;

  location?: LocationInterface;
  _count?: {};
}

export interface PetrolStationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  location_id?: string;
}
