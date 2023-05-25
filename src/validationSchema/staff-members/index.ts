import * as yup from 'yup';

export const staffMembersValidationSchema = yup.object().shape({
  work_schedule: yup.string().required(),
  user_id: yup.string().nullable(),
  restaurant_id: yup.string().nullable(),
});
