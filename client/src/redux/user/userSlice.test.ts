import { handleAccessToken } from '../../helpers/accessToken';

import { accessToken } from '../../utils/tests/mocks/user/userResponses';

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

const updatedPendingSate: UserInitialState = {
  ...initialState,
  error: undefined,
  loading: true,
};

const errorPayload = 'Error payload';
const updatedRejectedState: UserInitialState = {
  ...initialState,
  error: errorPayload,
  loading: false,
};

const userPayload = handleAccessToken(accessToken);
const updatedUserFulfilledState: UserInitialState = {
  ...initialState,
  ...userPayload,
  error: undefined,
  loading: false,
};

const emptyUserPayload = handleAccessToken('');
const updatedEmptyUserFulfilledState: UserInitialState = {
  ...initialState,
  ...userPayload,
  error: undefined,
  loading: false,
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

      expect(nextState).toEqual(updatedPendingSate);
    });
    it('should handle register.pending action', () => {
      const action = { type: register.pending };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedPendingSate);
    });
    it('should handle getSavedPokemons.pending action', () => {
      const action = { type: getSavedPokemons.pending };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedPendingSate);
    });
    it('should handle savePokemon.pending action', () => {
      const action = { type: savePokemon.pending };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedPendingSate);
    });
    it('should handle deletePokemon.pending action', () => {
      const action = { type: deletePokemon.pending };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedPendingSate);
    });
  });

  describe('rejected', () => {
    it('should handle login.rejected action', () => {
      const action = { type: login.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedRejectedState);
    });
    it('should handle register.rejected action', () => {
      const action = { type: register.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedRejectedState);
    });
    it('should handle logout.rejected action', () => {
      const action = { type: logout.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(initialState);
    });
    it('should handle getSavedPokemons.rejected action', () => {
      const action = { type: getSavedPokemons.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedRejectedState);
    });
    it('should handle savePokemon.rejected action', () => {
      const action = { type: savePokemon.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedRejectedState);
    });
    it('should handle deletePokemon.rejected action', () => {
      const action = { type: deletePokemon.rejected, payload: errorPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedRejectedState);
    });
  });

  describe('fulfilled', () => {
    it('should handle login.fulfilled action', () => {
      const action = { type: login.fulfilled, payload: userPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedUserFulfilledState);
    });
    it('should handle register.fulfilled action', () => {
      const action = { type: register.fulfilled, payload: userPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedUserFulfilledState);
    });
    it('should handle logout.fulfilled action', () => {
      const action = { type: logout.fulfilled, payload: emptyUserPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedEmptyUserFulfilledState);
    });
    it('should handle refreshToken.fulfilled action', () => {
      const action = { type: refreshToken.fulfilled, payload: userPayload };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState).toEqual(updatedUserFulfilledState);
    });

    // TODO: add test for Pokemons if msv responseData will be updated
  });
});
