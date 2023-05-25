import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';

export interface StaffMembersInterface {
  id?: string;
  user_id?: string;
  restaurant_id?: string;
  work_schedule: string;

  users?: UsersInterface;
  restaurants?: RestaurantsInterface;
}
