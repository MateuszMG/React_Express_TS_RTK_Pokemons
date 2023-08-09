import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pokemon } from '../../utils/types/pokemon';

import { getPokemon, getPokemons } from './pokemonsActions';

export interface PokemonsState {
  error: any;
  loading: boolean;
  page?: number;
  pokemons?: Pokemon[];
  selectedPokemon?: Pokemon;
  totalCount?: number;
}

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
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<Pokemon | undefined>) => {
      state.selectedPokemon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getPokemons
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
      })
      // getPokemon
      .addCase(getPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemon.fulfilled, (state, { payload }) => ({
        ...state,
        selectedPokemon: payload,
        loading: false,
      }))
      .addCase(getPokemon.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setSelectedPokemon } = pokemonsSlice.actions;
