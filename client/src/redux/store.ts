import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { userSlice } from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppSelector = () => useSelector((state: RootState) => state);
export const useAppDispatch = () => useDispatch<AppDispatch>();
