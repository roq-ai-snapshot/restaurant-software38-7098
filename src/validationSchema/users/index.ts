import * as yup from 'yup';
import { ordersValidationSchema } from 'validationSchema/orders';
import { reservationsValidationSchema } from 'validationSchema/reservations';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';
import { staffMembersValidationSchema } from 'validationSchema/staff-members';

export const usersValidationSchema = yup.object().shape({
  role: yup.string().required(),
  contact_information: yup.string().required(),
  orders: yup.array().of(ordersValidationSchema),
  reservations: yup.array().of(reservationsValidationSchema),
  restaurants: yup.array().of(restaurantsValidationSchema),
  staff_members: yup.array().of(staffMembersValidationSchema),
});
