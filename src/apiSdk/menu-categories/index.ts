import axios from 'axios';
import queryString from 'query-string';
import { MenuCategoriesInterface } from 'interfaces/menu-categories';
import { GetQueryInterface } from '../../interfaces';

export const getMenuCategories = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/menu-categories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMenuCategories = async (menuCategories: MenuCategoriesInterface) => {
  const response = await axios.post('/api/menu-categories', menuCategories);
  return response.data;
};

export const updateMenuCategoriesById = async (id: string, menuCategories: MenuCategoriesInterface) => {
  const response = await axios.put(`/api/menu-categories/${id}`, menuCategories);
  return response.data;
};

export const getMenuCategoriesById = async (id: string) => {
  const response = await axios.get(`/api/menu-categories/${id}`);
  return response.data;
};
