import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { reduxErrorHandler } from '../../helpers/errors';

import { pokemonsApiUrl } from '../../utils/config/const';

import { Pokemon, PokemonsApiResponse } from './pokemonsTypes';

interface GetPokemonsQuery {
  page: number;
  pageSize: number;
}

interface GetPokemons {
  page: number;
  pokemons: Pokemon[];
  totalCount: number;
}

export const getPokemons = createAsyncThunk<GetPokemons, GetPokemonsQuery>(
  'pokemons/getPokemons',
  async ({ page, pageSize }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${pokemonsApiUrl}?page=${page}&pageSize=${pageSize}`,
      );

      const { data, totalCount } = res.data as PokemonsApiResponse;

      const payload: GetPokemons = { page, pokemons: data, totalCount };

      return payload;
    } catch (error) {
      return reduxErrorHandler({ error, rejectWithValue });
    }
  },
);
