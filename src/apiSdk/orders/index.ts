import axios from 'axios';
import queryString from 'query-string';
import { OrdersInterface } from 'interfaces/orders';
import { GetQueryInterface } from '../../interfaces';

export const getOrders = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/orders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOrders = async (orders: OrdersInterface) => {
  const response = await axios.post('/api/orders', orders);
  return response.data;
};

export const updateOrdersById = async (id: string, orders: OrdersInterface) => {
  const response = await axios.put(`/api/orders/${id}`, orders);
  return response.data;
};

export const getOrdersById = async (id: string) => {
  const response = await axios.get(`/api/orders/${id}`);
  return response.data;
};
