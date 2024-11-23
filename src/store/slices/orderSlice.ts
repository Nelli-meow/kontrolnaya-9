import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransaction } from '../../types';
import { fetchAllTransactionThunk, transactionThunk } from '../thunks/dishesThunk.ts';


interface transactionState {
  transactions: ITransaction[];
  isFetching: boolean;

}

const initialState: transactionState = {
  transactions: [],
  isFetching: false,
}


export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<ITransaction>) => {
      state.transactions.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactionThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchAllTransactionThunk.fulfilled, (state, action: PayloadAction<ITransaction[]>) => {
        state.isFetching = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactionThunk.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(transactionThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(transactionThunk.fulfilled, (state, action: PayloadAction<ITransaction>) => {
        state.transactions.push(action.payload);
      })
      .addCase(transactionThunk.rejected, (state) => {
        state.isFetching = false;
      })
  }
});

export const transactionsReducer = transactionsSlice.reducer;
export const { addTransaction } = transactionsSlice.actions;