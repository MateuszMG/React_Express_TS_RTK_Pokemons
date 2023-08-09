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
  email: yup.string().required().lowercase().max(128).email().label('Email'),
  password: yup
    .string()
    .required()
    .trim()
    .strict(true)
    .min(6)
    .max(72)
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[#$!.%& *?])[A-Za-z\d#$!.%& *?]{6,72}$/,
      'Password must contain, one uppercase, one number and one special case character: # $ ! . % & * ? ',
    )
    .label('Password'),
});

export type LoginSchema = yup.InferType<typeof loginValidation>;
