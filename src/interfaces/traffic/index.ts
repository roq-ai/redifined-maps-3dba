import { LocationInterface } from 'interfaces/location';
import { GetQueryInterface } from 'interfaces';

export interface TrafficInterface {
  id?: string;
  status: string;
  estimated_clear_time?: any;
  location_id?: string;
  created_at?: any;
  updated_at?: any;

  location?: LocationInterface;
  _count?: {};
}

export interface TrafficGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  location_id?: string;
}
