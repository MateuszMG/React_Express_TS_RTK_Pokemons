import { LoginSchema } from '../../pages/Auth/Login/useLogin';
import { RegisterSchema } from '../../pages/Auth/Register/useRegister';

import { store } from '../store';
import { login, logout, refreshToken, register } from './userActions';
import {
  emptyUserFulfilledState,
  userFulfilledState,
  userPendingState,
} from './userSlice.test';

const loginPayload: LoginSchema = {
  email: 'email@email.com',
  password: 'Password123!',
};

const registerPayload: RegisterSchema = {
  username: 'username',
  email: 'email@email.com',
  password: 'Password123!',
  confirmPassword: 'Password123!',
};

describe('userActions', () => {
  describe('login', () => {
    it('should handle successful data fetching', async () => {
      await store.dispatch(login(loginPayload));
      const state = store.getState().user;

      expect(state).toStrictEqual(userFulfilledState);
    });

    it('should handle pending state during data fetching', async () => {
      store.dispatch(login(loginPayload));
      const state = store.getState().user;

      expect(state).toStrictEqual(userPendingState);
    });
  });

  describe('register', () => {
    it('should handle successful data fetching', async () => {
      await store.dispatch(register(registerPayload));
      const state = store.getState().user;

      expect(state).toStrictEqual(userFulfilledState);
    });

    it('should handle pending state during data fetching', async () => {
      store.dispatch(register(registerPayload));
      const state = store.getState().user;

      expect(state).toStrictEqual(userPendingState);
    });
  });

  describe('logout', () => {
    it('should handle successful data fetching', async () => {
      await store.dispatch(logout());
      const state = store.getState().user;

      expect(state).toStrictEqual(emptyUserFulfilledState);
    });

    it('should handle pending state during data fetching', async () => {
      store.dispatch(logout());
      const state = store.getState().user;

      expect(state).toStrictEqual(userPendingState);
    });
  });

  describe('refreshToken', () => {
    it('should handle successful data fetching', async () => {
      await store.dispatch(refreshToken());
      const state = store.getState().user;

      expect(state).toStrictEqual(userFulfilledState);
    });
  });
});
