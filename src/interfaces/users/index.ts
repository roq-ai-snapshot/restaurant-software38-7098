import { OrdersInterface } from 'interfaces/orders';
import { ReservationsInterface } from 'interfaces/reservations';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { StaffMembersInterface } from 'interfaces/staff-members';

export interface UsersInterface {
  id?: string;
  role: string;
  contact_information: string;
  orders?: OrdersInterface[];
  reservations?: ReservationsInterface[];
  restaurants?: RestaurantsInterface[];
  staff_members?: StaffMembersInterface[];
}
