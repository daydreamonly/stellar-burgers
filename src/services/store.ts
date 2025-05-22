import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredients/slice';
import { burgerConstructorSlice } from './burger-constructor/slice';
import { feedSlice } from './feed/slice';
import { userSlice } from './user/slice';
import { ordersSlice } from './order/slice';

const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  feedSlice,
  ordersSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
