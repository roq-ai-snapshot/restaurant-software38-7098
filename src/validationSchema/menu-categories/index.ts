import * as yup from 'yup';
import { menuItemsValidationSchema } from 'validationSchema/menu-items';

export const menuCategoriesValidationSchema = yup.object().shape({
  name: yup.string().required(),
  restaurant_id: yup.string().nullable(),
  menu_items: yup.array().of(menuItemsValidationSchema),
});
