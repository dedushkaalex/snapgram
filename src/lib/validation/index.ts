import * as yup from 'yup';

export const SignupValidation = yup.object().shape({
  name: yup.string().min(5, 'Too short').required(),
  username: yup.string().min(5, 'Too short').required(),
  email: yup.string().email().required(),
  password: yup.string().min(8, 'Password must be at least 8 character').required(),
});
