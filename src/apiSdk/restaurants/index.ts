import axios from 'axios';
import queryString from 'query-string';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { GetQueryInterface } from '../../interfaces';

export const getRestaurants = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/restaurants${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRestaurants = async (restaurants: RestaurantsInterface) => {
  const response = await axios.post('/api/restaurants', restaurants);
  return response.data;
};

export const updateRestaurantsById = async (id: string, restaurants: RestaurantsInterface) => {
  const response = await axios.put(`/api/restaurants/${id}`, restaurants);
  return response.data;
};

export const getRestaurantsById = async (id: string) => {
  const response = await axios.get(`/api/restaurants/${id}`);
  return response.data;
};
