import { configureStore } from '@reduxjs/toolkit';
import { transactionsReducer } from '../store/slices/orderSlice.ts';

export const store = configureStore({
  reducer: {
    addedTransactions: transactionsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;