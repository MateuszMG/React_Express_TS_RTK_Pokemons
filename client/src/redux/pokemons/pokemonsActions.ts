import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { reduxErrorHandler } from '../../helpers/errors';
import { LocalStorage } from '../../helpers/LocalStorage';

import { pokemonsApiUrl } from '../../utils/config/const';
import { Pokemon } from '../../utils/types/pokemon';

interface PokemonsApiResponse {
  count: number;
  data: Pokemon[] | [];
  page: number;
  pageSize: number;
  totalCount: number;
}

interface GetPokemonsParams {
  page: number;
  pageSize: number;
}

export interface GetPokemons {
  page: number;
  pokemons: Pokemon[];
  totalCount: number;
}

export const getPokemons = createAsyncThunk<GetPokemons, GetPokemonsParams>(
  'pokemons/getPokemons',
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.get(pokemonsApiUrl, { params });

      const { data, page, totalCount } = res.data as PokemonsApiResponse;

      const payload: GetPokemons = {
        page,
        pokemons: data,
        totalCount,
      };

      LocalStorage.add('pokemons', payload);

      return payload;
    } catch (error) {
      return reduxErrorHandler({ error, rejectWithValue });
    }
  },
);

interface GetPokemon {
  id: string;
}

export const getPokemon = createAsyncThunk<Pokemon, GetPokemon>(
  'pokemons/getPokemon',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${pokemonsApiUrl}/${id}`);

      return res.data.data as Pokemon;
    } catch (error) {
      return reduxErrorHandler({ error, rejectWithValue });
    }
  },
);
