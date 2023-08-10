import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { handleAccessToken, User } from '../../helpers/accessToken';
import { reduxErrorHandler } from '../../helpers/errors';

import { axios } from '../../utils/config/axios';
import { Pokemon } from '../../utils/types/pokemon';

import { LoginSchema } from '../../pages/Auth/Login/useLogin';
import { RegisterSchema } from '../../pages/Auth/Register/useRegister';

import { Pagination, SavedPokemon } from './userSlice';

export const login = createAsyncThunk<User, LoginSchema>(
  'user/login',
  async (data, { rejectWithValue }) => {
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
  async (data, { rejectWithValue }) => {
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

interface GetSavedPokemonsParams {
  pageSize: number;
  page: number;
}

export interface GetSavedPokemons {
  pagination: Pagination;
  pokemons: SavedPokemon[];
}

export const getSavedPokemons = createAsyncThunk<
  GetSavedPokemons,
  GetSavedPokemonsParams
>('user/getSavedPokemons', async (params, { rejectWithValue }) => {
  try {
    const res = await axios().get(`/pokemons`, { params });

    return res.data as GetSavedPokemons;
  } catch (error) {
    return reduxErrorHandler({ error, rejectWithValue });
  }
});

export const savePokemon = createAsyncThunk<SavedPokemon, Pokemon>(
  'user/savePokemon',
  async (pokemon, { rejectWithValue }) => {
    try {
      const res = await axios().post(`/pokemons`, {
        imageUrl: pokemon.images.large,
        name: pokemon.name,
        pokemonId: pokemon.id,
      });

      return res.data.pokemon as SavedPokemon;
    } catch (error) {
      return reduxErrorHandler({ error, rejectWithValue });
    }
  },
);

interface DeletePokemonParams {
  id: string;
}

export const deletePokemon = createAsyncThunk<string, DeletePokemonParams>(
  'user/deletePokemon',
  async (params, { rejectWithValue }) => {
    try {
      await axios().delete(`/pokemons`, { params });

      return params.id;
    } catch (error) {
      return reduxErrorHandler({ error, rejectWithValue });
    }
  },
);
