import { createSlice } from '@reduxjs/toolkit';

import { handleAccessToken, User } from '../../helpers/accessToken';
import { LocalStorage } from '../../helpers/LocalStorage';

import {
  deletePokemon,
  getSavedPokemons,
  login,
  logout,
  refreshToken,
  register,
  savePokemon,
} from './userActions';

export interface SavedPokemon {
  _id: string;
  createdAt: string;
  imageUrl: string;
  name: string;
  pokemonId: string;
}

export interface Pagination {
  pageSize: number;
  page: number;
  total: number;
}

export interface UserInitialState extends User {
  error?: any;
  loading: boolean;
  pagination?: Pagination;
  savedPokemons?: SavedPokemon[];
}

export const createInitialState = (): UserInitialState => ({
  ...handleAccessToken(LocalStorage.get('accessToken')),
  error: undefined,
  loading: false,
  pagination: undefined,
  savedPokemons: undefined,
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
        state.error = undefined;
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
        state.error = undefined;
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
        state.error = undefined;
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
      }))
      //getSavedPokemons
      .addCase(getSavedPokemons.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getSavedPokemons.fulfilled, (state, { payload }) => ({
        ...state,
        savedPokemons: payload.pokemons,
        pagination: payload.pagination,
        loading: false,
      }))
      .addCase(getSavedPokemons.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //savePokemon
      .addCase(savePokemon.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(savePokemon.fulfilled, (state, { payload }) => ({
        ...state,
        savedPokemons: [...(state?.savedPokemons || []), payload],
        loading: false,
      }))
      .addCase(savePokemon.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //deletePokemon
      .addCase(deletePokemon.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deletePokemon.fulfilled, (state, { payload }) => ({
        ...state,
        savedPokemons: (state?.savedPokemons || []).filter(
          (pokemon) => pokemon._id !== payload,
        ),
        loading: false,
      }))
      .addCase(deletePokemon.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
