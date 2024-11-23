import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RootState } from '../../app/store.ts';
import { useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { deleteTransactions, fetchAllTransactionThunk } from '../../store/thunks/dishesThunk.ts';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const transactions = useAppSelector((state: RootState) => state.addedTransactions.transactions);

  const fetchDishes = useCallback(() => {
    dispatch(fetchAllTransactionThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  const deleteOneTransaction = useCallback(
    async (id: string) => {
      await dispatch(deleteTransactions(id));
      fetchDishes();
    },
    [dispatch]
  );

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-sm-between align-items-center">
        <h4>Categories</h4>
        <Link to="/add" className="btn btn-outline-info">Add</Link>
      </div>

      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="border border-2 rounded my-4 p-5 d-flex align-items-center justify-content-between">
            <h5>{transaction.category}</h5>
            <div className="d-flex justify-content-sm-between align-items-center p-4">
              <span className="me-3"><strong>{transaction.type}</strong></span>
              <Link to={`/edit/${transaction.id}/transaction`} className="btn btn-outline-warning me-3">Edit</Link>
              <button onClick={() => deleteOneTransaction(transaction.id)} className="btn btn-outline-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;