import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { RootState } from '../../app/store.ts';
import { useEffect } from 'react';
import { fetchAllTransactionThunk } from '../../store/thunks/dishesThunk.ts';
import TransactionItem from '../../components/TransactionItem/TransactionItem.tsx';
import { selectFetchTransactionsLoading } from '../../store/slices/orderSlice.ts';
import Loader from '../../components/UI/Loader.tsx';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const transactions = useAppSelector((state: RootState) => state.addedTransactions.transactions);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchAllTransactionThunk());
  }, [dispatch]);

  const total = transactions.reduce((acc, transaction) => {
    const amount = Number(transaction.amount);
    return transaction.type === 'Expense'
      ? acc - amount
      : acc + amount;
  }, 0);


  return (
    <div className="container">
      <h3 className="mt-5">Total: {total}</h3>
      <hr/>
      <div className="d-flex align-items-center gap-4">
          <>
            {transactions.length === 0 ? (
              <p>No transactions.</p>
            ) : (
              <TransactionItem/>
            )}
          </>
      </div>
    </div>
  );
};

export default MainPage;