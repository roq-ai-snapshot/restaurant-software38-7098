import * as yup from 'yup';

export const reservationsValidationSchema = yup.object().shape({
  reservation_time: yup.date().required(),
  table_number: yup.number().integer().required(),
  party_size: yup.number().integer().required(),
  customer_id: yup.string().nullable(),
  restaurant_id: yup.string().nullable(),
});
