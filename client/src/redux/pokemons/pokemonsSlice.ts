import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocalStorage } from '../../helpers/LocalStorage';

import { Pokemon } from '../../utils/types/pokemon';

import { getPokemon, GetPokemons, getPokemons } from './pokemonsActions';

interface PokemonsState {
  error: any;
  loading: boolean;
  page?: number;
  pokemons?: Pokemon[];
  selectedPokemon?: Pokemon;
  totalCount?: number;
}

const createInitialState = (): PokemonsState => {
  const data = LocalStorage.get('pokemons') as GetPokemons | null;

  return {
    error: undefined,
    loading: false,
    page: data?.page,
    pokemons: data?.pokemons,
    selectedPokemon: undefined,
    totalCount: data?.totalCount,
  };
};

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: createInitialState(),
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
