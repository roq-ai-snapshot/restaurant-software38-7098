import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';

export interface ReservationsInterface {
  id?: string;
  customer_id?: string;
  restaurant_id?: string;
  reservation_time: Date;
  table_number: number;
  party_size: number;

  users?: UsersInterface;
  restaurants?: RestaurantsInterface;
}
