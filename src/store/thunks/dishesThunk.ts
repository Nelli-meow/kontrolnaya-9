import{ createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';
import { ITransactions, ITransactionAPI, ITransaction } from '../../types';

export const fetchAllTransactionThunk =  createAsyncThunk<ITransactions[], void>(
  'transactions/fetchAllTransactionThunk',
  async () => {
    const response : {data: ITransactionAPI | null} = await axiosAPI('transactions.json');
    const transactionAll = response.data;


    if(transactionAll === null) {
      return [];
    }

    return Object.keys(transactionAll).map((key) => {
      const transaction = { ...transactionAll[key] };

      return {
        id: key,
        ...transaction,
      };
    });

  }
)

export const transactionThunk = createAsyncThunk<ITransaction, ITransaction>(
  'transactions/transactionThunk',
  async (newTransaction) => {
    const response = await axiosAPI.post('/transactions.json', newTransaction);
    return response.data;
  }
);