import * as yup from 'yup';

export const analyticsValidationSchema = yup.object().shape({
  report_type: yup.string().required(),
  data: yup.string().required(),
  restaurant_id: yup.string().nullable(),
});
