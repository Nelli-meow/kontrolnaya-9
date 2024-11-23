import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { RootState } from '../../app/store.ts';
import { useEffect } from 'react';
import { fetchAllTransactionThunk } from '../../store/thunks/dishesThunk.ts';
import TransactionItem from '../../components/TransactionItem/TransactionItem.tsx';

const MainPage = () => {
  const transactions = useAppSelector((state: RootState) => state.addedTransactions.transactions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTransactionThunk());
  }, [dispatch]);


  return (
    <div className="container">
      <h3 className="mt-5">Total: </h3>
      <hr/>
      <div className="d-flex align-items-center gap-4">
        {transactions.length === 0 ? (
          <p>No transactions.</p>
        ) : (
          <TransactionItem/>
        )}
      </div>
    </div>
  );
};

export default MainPage;