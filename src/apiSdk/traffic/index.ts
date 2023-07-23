import axios from 'axios';
import queryString from 'query-string';
import { TrafficInterface, TrafficGetQueryInterface } from 'interfaces/traffic';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTraffic = async (query?: TrafficGetQueryInterface): Promise<PaginatedInterface<TrafficInterface>> => {
  const response = await axios.get('/api/traffic', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTraffic = async (traffic: TrafficInterface) => {
  const response = await axios.post('/api/traffic', traffic);
  return response.data;
};

export const updateTrafficById = async (id: string, traffic: TrafficInterface) => {
  const response = await axios.put(`/api/traffic/${id}`, traffic);
  return response.data;
};

export const getTrafficById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/traffic/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrafficById = async (id: string) => {
  const response = await axios.delete(`/api/traffic/${id}`);
  return response.data;
};
