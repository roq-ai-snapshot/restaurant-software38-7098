import { OrderItemsInterface } from 'interfaces/order-items';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';

export interface OrdersInterface {
  id?: string;
  customer_id?: string;
  restaurant_id?: string;
  order_status: string;
  special_instructions?: string;
  payment_method: string;
  order_items?: OrderItemsInterface[];
  users?: UsersInterface;
  restaurants?: RestaurantsInterface;
}
