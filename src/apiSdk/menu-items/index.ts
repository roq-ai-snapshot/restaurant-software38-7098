import axios from 'axios';
import queryString from 'query-string';
import { MenuItemsInterface } from 'interfaces/menu-items';
import { GetQueryInterface } from '../../interfaces';

export const getMenuItems = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/menu-items${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMenuItems = async (menuItems: MenuItemsInterface) => {
  const response = await axios.post('/api/menu-items', menuItems);
  return response.data;
};

export const updateMenuItemsById = async (id: string, menuItems: MenuItemsInterface) => {
  const response = await axios.put(`/api/menu-items/${id}`, menuItems);
  return response.data;
};

export const getMenuItemsById = async (id: string) => {
  const response = await axios.get(`/api/menu-items/${id}`);
  return response.data;
};
