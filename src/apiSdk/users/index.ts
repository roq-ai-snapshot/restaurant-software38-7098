import axios from 'axios';
import queryString from 'query-string';
import { UsersInterface } from 'interfaces/users';
import { GetQueryInterface } from '../../interfaces';

export const getUsers = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/users${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUsers = async (users: UsersInterface) => {
  const response = await axios.post('/api/users', users);
  return response.data;
};

export const updateUsersById = async (id: string, users: UsersInterface) => {
  const response = await axios.put(`/api/users/${id}`, users);
  return response.data;
};

export const getUsersById = async (id: string) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};
