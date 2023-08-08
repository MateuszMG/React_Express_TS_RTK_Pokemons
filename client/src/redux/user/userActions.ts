import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { handleAccessToken, User } from '../../helpers/accessToken';
import { reduxErrorHandler } from '../../helpers/errors';

import { axios } from '../../utils/config/axios';

import { LoginSchema } from '../../pages/Auth/Login/useLogin';
import { RegisterSchema } from '../../pages/Auth/Register/useRegister';

export const login = createAsyncThunk<User, LoginSchema>(
  'user/login',
  async (data: LoginSchema, { rejectWithValue }) => {
    try {
      const res = await axios().post(`/login`, data);

      const user = handleAccessToken(res.data.accessToken);

      toast.success('Logged in successfully');

      return user;
    } catch (error) {
      return reduxErrorHandler({ error, rejectWithValue });
    }
  },
);

export const register = createAsyncThunk<User, RegisterSchema>(
  'user/register',
  async (data: RegisterSchema, { rejectWithValue }) => {
    try {
      const res = await axios().post(`/register`, data);

      const user = handleAccessToken(res.data.accessToken);

      toast.success('Nice to meet you');

      return user;
    } catch (error) {
      return reduxErrorHandler({ error, rejectWithValue });
    }
  },
);

export const logout = createAsyncThunk<User, void>('user/logout', async () => {
  const user = handleAccessToken('');
  localStorage.clear();
  toast.success('See you later', { toastId: 'See you later' });

  try {
    await axios().get(`/logout`);
  } catch (error) {}

  return user;
});

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, { dispatch }) => {
    try {
      const res = await axios().get(`/refreshToken`);

      const user = handleAccessToken(res.data.accessToken);

      return user;
    } catch (error) {
      dispatch(logout());
    }
  },
);
