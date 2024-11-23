import { useParams } from 'react-router-dom';
import TransactionForm from '../../components/TransactionForm/TransactionForm.tsx';
import { useCallback, useEffect, useState } from 'react';
import { ITransaction, ITransactions } from '../../types';
import axiosAPI from '../../axiosAPI.ts';


const EditForm = () => {
  const params = useParams<{ idTransactions: string }>();
  const [transaction, setTransaction] = useState<ITransaction>();

  const fetchOneTransaction = useCallback(async (id: string) => {
    try {
      const response = await axiosAPI<ITransaction>(`/transactions/${id}.json`);
      if (response.data) {
        setTransaction(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const submitForm = async (transaction: ITransactions) => {
    try {
      if (params.idTransactions) {
        await axiosAPI.put(`/transactions/${params.idTransactions}.json`, { ...transaction });

      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (params.idTransactions) {
      void fetchOneTransaction(params.idTransactions);
    }
  }, [params.idTransactions, fetchOneTransaction]);

  return (
    <>
        <TransactionForm submitForm={submitForm} transactionToEdit={transaction} />
    </>
  );
};

export default EditForm;
