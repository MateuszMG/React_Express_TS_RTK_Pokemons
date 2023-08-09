import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { login } from '../../../redux/user/userActions';

const defaultValues: LoginSchema = {
  email: 'email123@gmail.com',
  password: 'Password123!',
};

export const useLogin = () => {
  const { loading, logged } = useAppSelector().user;
  const dispatch = useAppDispatch();

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<LoginSchema>({
    defaultValues: process.env.NODE_ENV === 'development' ? defaultValues : {},
    mode: 'onChange',
    resolver: yupResolver(loginValidation),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(login(data));
  });

  return {
    errors,
    isValid,
    loading,
    logged,
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
