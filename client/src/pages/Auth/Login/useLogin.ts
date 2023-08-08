import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { login } from '../../../redux/user/userActions';

export const useLogin = () => {
  const {
    user: { loading, logged },
  } = useAppSelector();
  const dispatch = useAppDispatch();

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<LoginSchema>({
    mode: 'onChange',
    resolver: yupResolver(loginValidation),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(login(data));
  });

  return {
    errors,
    loading,
    logged,
    isValid,
    onSubmit,
    register,
    reset,
  };
};

export const loginValidation = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .trim('Username cannot contain leading and trailing spaces')
    .strict(true)
    .min(3, 'Username must be at least 3 characters long')
    .max(40, 'Username cannot exceed 40 characters'),
  password: yup
    .string()
    .required('Password is required')
    .trim('Password cannot contain leading and trailing spaces')
    .strict(true)
    .min(6, 'Password must be at least 6 characters long')
    .max(72, 'Password cannot exceed 72 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[#$!.%& *?])[A-Za-z\d#$!.%& *?]{6,72}$/,
      'Password must contain, one uppercase, one number and one special case character: # $ ! . % & * ? ',
    ),
});

export type LoginSchema = yup.InferType<typeof loginValidation>;
