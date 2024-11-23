import{ createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';
import { ITransactions, ITransactionAPI, ITransaction, editTransactionParams } from '../../types';

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

export const deleteTransactions = createAsyncThunk<void, string>(
  'transactions/deleteTransactions',
  async (id: string) => {
    await axiosAPI.delete(`transactions/${id}.json`);
  }
);

export const getOneTransactionById = createAsyncThunk<ITransactionAPI, string>(
  'transactions/getOneTransactionById',
  async (id) => {

    const response = await axiosAPI.get<ITransactionAPI | null>('/transactions/' + id + '.json');
    const transaction = response.data;

    if (transaction === null) {
      throw new Error('Not found');
    }
    return transaction;
  }

);

export const editTransaction = createAsyncThunk<void, {transactionId: string, transaction: ITransactionAPI}>(
  'transactions/editTransaction',
  async ({id, transaction}) => {
    await axiosAPI.put('/dishes/' + id + '.json', {...transaction});
  }
);