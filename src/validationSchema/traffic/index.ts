import * as yup from 'yup';

export const trafficValidationSchema = yup.object().shape({
  status: yup.string().required(),
  estimated_clear_time: yup.date(),
  location_id: yup.string().nullable(),
});
