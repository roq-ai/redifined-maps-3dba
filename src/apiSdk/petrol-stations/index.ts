import axios from 'axios';
import queryString from 'query-string';
import { PetrolStationInterface, PetrolStationGetQueryInterface } from 'interfaces/petrol-station';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPetrolStations = async (
  query?: PetrolStationGetQueryInterface,
): Promise<PaginatedInterface<PetrolStationInterface>> => {
  const response = await axios.get('/api/petrol-stations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPetrolStation = async (petrolStation: PetrolStationInterface) => {
  const response = await axios.post('/api/petrol-stations', petrolStation);
  return response.data;
};

export const updatePetrolStationById = async (id: string, petrolStation: PetrolStationInterface) => {
  const response = await axios.put(`/api/petrol-stations/${id}`, petrolStation);
  return response.data;
};

export const getPetrolStationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/petrol-stations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePetrolStationById = async (id: string) => {
  const response = await axios.delete(`/api/petrol-stations/${id}`);
  return response.data;
};
