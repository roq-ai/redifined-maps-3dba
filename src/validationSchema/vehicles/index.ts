import * as yup from 'yup';

export const vehicleValidationSchema = yup.object().shape({
  type: yup.string().required(),
  location_id: yup.string().nullable(),
});
