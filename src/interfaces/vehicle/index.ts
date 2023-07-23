import { LocationInterface } from 'interfaces/location';
import { GetQueryInterface } from 'interfaces';

export interface VehicleInterface {
  id?: string;
  type: string;
  location_id?: string;
  created_at?: any;
  updated_at?: any;

  location?: LocationInterface;
  _count?: {};
}

export interface VehicleGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  location_id?: string;
}
