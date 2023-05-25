import { AnalyticsInterface } from 'interfaces/analytics';
import { MenuCategoriesInterface } from 'interfaces/menu-categories';
import { OrdersInterface } from 'interfaces/orders';
import { ReservationsInterface } from 'interfaces/reservations';
import { StaffMembersInterface } from 'interfaces/staff-members';
import { UsersInterface } from 'interfaces/users';

export interface RestaurantsInterface {
  id?: string;
  owner_id?: string;
  name: string;
  location: string;
  operating_hours: string;
  analytics?: AnalyticsInterface[];
  menu_categories?: MenuCategoriesInterface[];
  orders?: OrdersInterface[];
  reservations?: ReservationsInterface[];
  staff_members?: StaffMembersInterface[];
  users?: UsersInterface;
}
