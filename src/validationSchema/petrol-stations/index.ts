import * as yup from 'yup';

export const petrolStationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  distance: yup.number().integer(),
  location_id: yup.string().nullable(),
});
