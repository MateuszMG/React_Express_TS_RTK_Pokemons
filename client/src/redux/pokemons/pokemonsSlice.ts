import { createSlice } from '@reduxjs/toolkit';

import { getPokemons } from './pokemonsActions';
import { PokemonsState } from './pokemonsTypes';

const initialState: PokemonsState = {
  error: undefined,
  loading: false,
  page: undefined,
  pokemons: undefined,
  selectedPokemon: undefined,
  totalCount: undefined,
};

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemons.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
        loading: false,
      }))
      .addCase(getPokemons.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
