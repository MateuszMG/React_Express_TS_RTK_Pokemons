import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { register as signUp } from '../../../redux/user/userActions';

const defaultValues: RegisterSchema = {
  username: 'username123',
  email: 'email123@gmail.com',
  password: 'Password123!',
  confirmPassword: 'Password123!',
};

export const useRegister = () => {
  const { loading, logged } = useAppSelector().user;
  const dispatch = useAppDispatch();

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<RegisterSchema>({
    defaultValues: process.env.NODE_ENV === 'development' ? defaultValues : {},
    mode: 'onChange',
    resolver: yupResolver(registerValidation),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(signUp(data));
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

export const registerValidation = yup.object({
  username: yup
    .string()
    .required()
    .trim()
    .strict(true)
    .min(3)
    .max(40)
    .label('Username'),
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
  confirmPassword: yup
    .string()
    .required('Repeat password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export type RegisterSchema = yup.InferType<typeof registerValidation>;
