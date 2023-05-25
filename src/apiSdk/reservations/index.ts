import axios from 'axios';
import queryString from 'query-string';
import { ReservationsInterface } from 'interfaces/reservations';
import { GetQueryInterface } from '../../interfaces';

export const getReservations = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/reservations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createReservations = async (reservations: ReservationsInterface) => {
  const response = await axios.post('/api/reservations', reservations);
  return response.data;
};

export const updateReservationsById = async (id: string, reservations: ReservationsInterface) => {
  const response = await axios.put(`/api/reservations/${id}`, reservations);
  return response.data;
};

export const getReservationsById = async (id: string) => {
  const response = await axios.get(`/api/reservations/${id}`);
  return response.data;
};
