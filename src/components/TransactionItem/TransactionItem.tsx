import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { RootState } from '../../app/store.ts';
import { useCallback } from 'react';
import { deleteTransactions, fetchAllTransactionThunk } from '../../store/thunks/dishesThunk.ts';


const TransactionItem = () => {
  const transactions = useAppSelector((state: RootState) => state.addedTransactions.transactions);
  const dispatch = useAppDispatch();


  const newTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const fetchDishes = useCallback(() => {
    dispatch(fetchAllTransactionThunk());
  }, [dispatch]);

  const deleteOneTransaction = useCallback(
    async (id: string) => {
      await dispatch(deleteTransactions(id));
      fetchDishes();
    },
    [dispatch]
  );


  return (
    <div className="container align-items-center">
      {newTransactions.map((transaction) => (
        <div key={transaction.id} className="my-5 border border-2 rounded-md shadow-sm p-4 d-flex align-items-center justify-content-sm-between">
          <div className="p-4">
            <span><strong>Date:</strong> {new Date(transaction.date).toString()}</span>
            <h4>{transaction.category}</h4>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-4">
            <span>{transaction.type === 'Expense' ? '-' + transaction.amount : '+' + transaction.amount} KGS</span>
            <Link to={`/edit/${transaction.id}/transaction`} className="btn btn-outline-warning">Edit</Link>
            <button onClick={()  =>  deleteOneTransaction(transaction.id)} className="btn btn-outline-danger">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};



export default TransactionItem;