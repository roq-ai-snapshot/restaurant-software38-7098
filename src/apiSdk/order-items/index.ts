import axios from 'axios';
import queryString from 'query-string';
import { OrderItemsInterface } from 'interfaces/order-items';
import { GetQueryInterface } from '../../interfaces';

export const getOrderItems = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/order-items${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOrderItems = async (orderItems: OrderItemsInterface) => {
  const response = await axios.post('/api/order-items', orderItems);
  return response.data;
};

export const updateOrderItemsById = async (id: string, orderItems: OrderItemsInterface) => {
  const response = await axios.put(`/api/order-items/${id}`, orderItems);
  return response.data;
};

export const getOrderItemsById = async (id: string) => {
  const response = await axios.get(`/api/order-items/${id}`);
  return response.data;
};
