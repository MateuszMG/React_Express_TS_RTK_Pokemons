import { handleAccessToken } from '../../helpers/accessToken';

import {
  accessToken,
  userResponses,
} from '../../utils/tests/mocks/user/userResponses';

import {
  deletePokemon,
  getSavedPokemons,
  login,
  logout,
  refreshToken,
  register,
  savePokemon,
} from './userActions';
import { createInitialState, UserInitialState, userSlice } from './userSlice';

const initialState = createInitialState();

export const userPendingState: UserInitialState = {
  ...initialState,
  error: undefined,
  loading: true,
};

const errorPayload = 'Error payload';
const userRejectedState: UserInitialState = {
  ...initialState,
  error: errorPayload,
  loading: false,
};

const userPayload = handleAccessToken(accessToken);
export const userFulfilledState: UserInitialState = {
  ...initialState,
  ...userPayload,
};

const emptyUserPayload = handleAccessToken('');
export const emptyUserFulfilledState: UserInitialState = {
  ...initialState,
  ...userPayload,
};

const pokemonsPayload = userResponses.getSavedPokemons;
export const getSavedPokemonsFulfilledState: UserInitialState = {
  ...initialState,
  pagination: pokemonsPayload.pagination,
  savedPokemons: pokemonsPayload.pokemons,
};

const pokemonPayload = userResponses.savePokemon.pokemon;
const savePokemonsFulfilledState: UserInitialState = {
  ...initialState,
  savedPokemons: [pokemonPayload],
};

const initialStateBeforeDeletePokemon: UserInitialState = {
  ...initialState,
  pagination: pokemonsPayload.pagination,
  savedPokemons: pokemonsPayload.pokemons,
};

const deletePokemonPayload = pokemonsPayload.pokemons[0]._id;
const deletePokemonsFulfilledState: UserInitialState = {
  ...initialStateBeforeDeletePokemon,
  savedPokemons: initialStateBeforeDeletePokemon.savedPokemons?.filter(
    (pokemon) => pokemon._id !== deletePokemonPayload,
  ),
};

describe('tests for userSlice', () => {
  describe('init', () => {
    test('initialize slice with initialValue', () => {
      const userSliceInit = userSlice.reducer(initialState, {
        type: 'unknown',
      });
      expect(userSliceInit).toBe(initialState);
    });
  });

  describe('pending', () => {
    it('should handle login.pending action', () => {
      const action = { type: login.pending };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userPendingState);
    });
    it('should handle register.pending action', () => {
      const action = { type: register.pending };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userPendingState);
    });
    it('should handle getSavedPokemons.pending action', () => {
      const action = { type: getSavedPokemons.pending };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userPendingState);
    });
    it('should handle savePokemon.pending action', () => {
      const action = { type: savePokemon.pending };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userPendingState);
    });
    it('should handle deletePokemon.pending action', () => {
      const action = { type: deletePokemon.pending };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userPendingState);
    });
  });

  describe('rejected', () => {
    it('should handle login.rejected action', () => {
      const action = { type: login.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userRejectedState);
    });
    it('should handle register.rejected action', () => {
      const action = { type: register.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userRejectedState);
    });
    it('should handle logout.rejected action', () => {
      const action = { type: logout.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(initialState);
    });
    it('should handle getSavedPokemons.rejected action', () => {
      const action = { type: getSavedPokemons.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userRejectedState);
    });
    it('should handle savePokemon.rejected action', () => {
      const action = { type: savePokemon.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userRejectedState);
    });
    it('should handle deletePokemon.rejected action', () => {
      const action = { type: deletePokemon.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userRejectedState);
    });
  });

  describe('fulfilled', () => {
    it('should handle login.fulfilled action', () => {
      const action = { type: login.fulfilled, payload: userPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userFulfilledState);
    });
    it('should handle register.fulfilled action', () => {
      const action = { type: register.fulfilled, payload: userPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userFulfilledState);
    });
    it('should handle logout.fulfilled action', () => {
      const action = { type: logout.fulfilled, payload: emptyUserPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(emptyUserFulfilledState);
    });
    it('should handle refreshToken.fulfilled action', () => {
      const action = { type: refreshToken.fulfilled, payload: userPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(userFulfilledState);
    });
    it('should handle getSavedPokemons.fulfilled action', () => {
      const action = {
        type: getSavedPokemons.fulfilled,
        payload: pokemonsPayload,
      };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(getSavedPokemonsFulfilledState);
    });
    it('should handle savePokemon.fulfilled action', () => {
      const action = { type: savePokemon.fulfilled, payload: pokemonPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toStrictEqual(savePokemonsFulfilledState);
    });
    it('should handle deletePokemon.fulfilled action', () => {
      const action = {
        type: deletePokemon.fulfilled,
        payload: deletePokemonPayload,
      };
      const nextState = userSlice.reducer(
        initialStateBeforeDeletePokemon,
        action,
      );

      expect(nextState).toStrictEqual(deletePokemonsFulfilledState);
    });
  });
});
