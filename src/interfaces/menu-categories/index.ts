import { MenuItemsInterface } from 'interfaces/menu-items';
import { RestaurantsInterface } from 'interfaces/restaurants';

export interface MenuCategoriesInterface {
  id?: string;
  restaurant_id?: string;
  name: string;
  menu_items?: MenuItemsInterface[];
  restaurants?: RestaurantsInterface;
}
