import { createSlice } from '@reduxjs/toolkit';

import { handleAccessToken, User } from '../../helpers/accessToken';
import { getFromTheLS } from '../../helpers/localStorage';

import { login, logout, refreshToken, register } from './userActions';

interface InitialState extends User {
  error: any;
  loading: boolean;
}

const createInitialState = (): InitialState => ({
  ...handleAccessToken(getFromTheLS('accessToken')),
  error: null,
  loading: false,
});

export const userSlice = createSlice({
  name: 'user',
  initialState: createInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
        loading: false,
      }))
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
        loading: false,
      }))
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
        loading: false,
      }))
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      //refreshToken
      .addCase(refreshToken.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
      }));
  },
});
