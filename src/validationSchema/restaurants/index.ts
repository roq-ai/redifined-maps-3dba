import * as yup from 'yup';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  distance: yup.number().integer(),
  location_id: yup.string().nullable(),
});
