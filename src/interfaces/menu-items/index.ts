import { OrderItemsInterface } from 'interfaces/order-items';
import { MenuCategoriesInterface } from 'interfaces/menu-categories';

export interface MenuItemsInterface {
  id?: string;
  category_id?: string;
  name: string;
  description: string;
  price: number;
  order_items?: OrderItemsInterface[];
  menu_categories?: MenuCategoriesInterface;
}
