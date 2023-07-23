import { PetrolStationInterface } from 'interfaces/petrol-station';
import { RestaurantInterface } from 'interfaces/restaurant';
import { TrafficInterface } from 'interfaces/traffic';
import { VehicleInterface } from 'interfaces/vehicle';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface LocationInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  petrol_station?: PetrolStationInterface[];
  restaurant?: RestaurantInterface[];
  traffic?: TrafficInterface[];
  vehicle?: VehicleInterface[];
  user?: UserInterface;
  _count?: {
    petrol_station?: number;
    restaurant?: number;
    traffic?: number;
    vehicle?: number;
  };
}

export interface LocationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
